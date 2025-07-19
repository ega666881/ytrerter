import {z, ZodError} from "zod";
import {NextFunction, Request, Response} from "express";

export enum ValidationTarget {
  QUERY = 'query',
  BODY = 'body',
  PARAMS = 'params',
}

const validate = (
  schema: z.ZodObject<any>,
  target: ValidationTarget = ValidationTarget.BODY,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      Object.defineProperty(req, target, {
        value: schema.parse(req[target]),
        writable: false,
      })
      next()
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((issue) => (
          {
            message: `${issue.path.join('.')} is ${issue.message}`,
          }
        ))

        res.status(400)
          .json({
            message: errorMessages,
          })
        return
      }

      res.status(500)
        .json({
          message: e.message,
        })
    }
  }
}


export {validate}
