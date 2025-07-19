import {Controller} from "../../util/controller.ts";
import express, {Request, Response, Router} from "express";
import * as schemas from './schema'
import {validate, ValidationTarget} from "../../util/middleware/zod-validator.ts";
import {isIpv6Supported} from "../../../../core/ipv6/is-supported.ts";
import {ApiError} from "../../util/api-error.ts";
import rateLimit from "express-rate-limit";
import {bannedIps, checkBan} from "../../util/banned-ips.ts";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    const ip: string = req.ip!
    const banDurationMs = 15 * 60 * 1000
    const banUntil: number = Date.now() + banDurationMs

    bannedIps.set(ip, banUntil);

    res.status(429).json({
      error: 'Too many requests',
    });
  },
  skip: (req: Request): boolean => bannedIps.has(req.ip!) && bannedIps.get(req.ip!)! > Date.now(),
});

export class Ipv6Controller implements Controller {
  getRouter(): Router {
    const router: Router = express.Router()

    router.get(
      "/is-supported",
      checkBan,
      limiter,
      validate(schemas.isSupported.schema, ValidationTarget.QUERY),
      (req, res) => this.isSupported(req, res)
    )

    return router
  }

  async isSupported(req: Request, res: Response): Promise<void> {
    const result: boolean | null = await isIpv6Supported(req.query.url as string).catch(() => null)

    if (result === null) {
      throw new ApiError(400, 'cant resolve hostname')
    }

    res.status(200).json({
      message: "OK",
      data: {
        result: result
      }
    })
  }
}
