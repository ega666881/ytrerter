import express, {Request, Response, Router} from "express";
import {validate} from "../../util/middleware/zod-validator.ts";
import {Controller} from "../../util/controller.ts";
import {TransactionService} from "./service.ts";
import {Transaction} from "../../../../core/database/schema";
import {create} from "./schema";

export class TransactionController implements Controller {
  constructor(
    private readonly transactionService: TransactionService,
  ) {
  }

  getRouter(): Router {
    const router: Router = express.Router()

    router.post(
      '/',
      // rateLimit({ windowMs: 1000 * 60 * 2, limit: 1 }),
      validate(create.schema),
      (req, res) => this.create(req, res)
    )

    return router
  }

  async create(req: Request, res: Response): Promise<void> {
    const transaction: Transaction = await this.transactionService.create(
      req.body
    )

    res.status(200).json({
      data: transaction,
    })
  }
}
