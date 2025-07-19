import {Controller} from "../../util/controller.ts";
import express, {Router, Request, Response} from "express";
import {KeyService} from "./service.ts";

export class KeyController implements Controller {
  constructor(
    private readonly keyService: KeyService
  ) {
  }

  getRouter(): Router {
    const router: Router = express.Router()

    router.get(
      '/permalink/:permalink',
      // rateLimit({ windowMs: 1000 * 60 * 2, limit: 1 }),
      (req, res) => this.getByPermalink(req, res)
    )

    return router
  }

  async getByPermalink(req: Request, res: Response): Promise<void> {
    const key = await this.keyService.geyByPermalink(req.params.permalink)

    res.status(200).json({
      data: key
    })
  }
}
