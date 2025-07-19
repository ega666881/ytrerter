import * as schemas from './schema'
import {z} from "zod";
import {FeedbackService as NativeFeedbackService} from "../../../../service/feedback/service.ts";

export class FeedbackService {
  async create(dto: z.infer<typeof schemas.create.schema>) {
    await NativeFeedbackService.send(schemas.create.toDto(dto))
  }
}
