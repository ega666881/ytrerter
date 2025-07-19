import winston from "winston"
import {getLoggerOptions} from "../../core/logger/config.ts"
import express, {NextFunction, Request, Response} from "express"
import cors from 'cors'
import {ApiError} from "./util/api-error.ts";
import {TransactionController, TransactionService} from "./module/transaction";
import {KeyController, KeyService} from "./module/key";
import {Ipv6Controller} from "./module/ipv6/controller.ts";
import {FeedbackController} from "./module/feedback/controller.ts";
import {FeedbackService} from "./module/feedback/service.ts";

class HttpTransport {
  private readonly app = express()
  private readonly logger = winston.createLogger(getLoggerOptions('http-server'))

  async listen() {
    this.app.use(express.json())
    this.app.use(cors())

    const transactionService = new TransactionService()
    const keyService = new KeyService()
    const feedbackService = new FeedbackService()

    this.app.use(
      this.getPath('transactions'),
      new TransactionController(transactionService).getRouter()
    )
    this.app.use(
      this.getPath('keys'),
      new KeyController(keyService).getRouter()
    )
    this.app.use(
      this.getPath('ipv6'),
      new Ipv6Controller().getRouter()
    )
    this.app.use(
      this.getPath('feedback'),
      new FeedbackController(feedbackService).getRouter()
    )

    this.app.use((
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      console.log(err)
      res.status(err instanceof ApiError ? err.statusCode : 500)
        .json({message: err.message})
    })

    const port: number = process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 3000

    this.app.listen(
      port,
      '0.0.0.0',
    )

    this.logger.info(`HTTP server is listening on port ${port}`)
  }

  private getPath(name: string): string {
    return `/api/${name}`
  }
}

export default new HttpTransport()
