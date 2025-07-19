import {Controller} from "../../util/controller.ts";
import {FeedbackService} from "./service.ts";
import express, {Request, Response, Router} from "express";
import rateLimit from "express-rate-limit";
import {validate, ValidationTarget} from "../../util/middleware/zod-validator.ts";
import * as schemas from './schema'

export class FeedbackController implements Controller {
  constructor(private readonly feedbackService: FeedbackService) {
  }

  getRouter(): Router {
    const router = express.Router()

    router.post(
      '/',
      rateLimit({windowMs: 10000 * 60 * 60, limit: 10}),
      validate(schemas.create.schema),
      (req, res) => this.create(req, res)
    )

    return router
  }

  async create(req: Request, res: Response): Promise<void> {
    await this.feedbackService.create(req.body)

    res.status(200).json({
      message: "OK"
    })
  }
}
