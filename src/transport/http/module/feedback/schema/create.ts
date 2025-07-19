import {z} from "zod";
import {SendFeedbackDto} from "../../../../../service/feedback/dto";

export const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  message: z.string().min(50),
})

export function toDto(object: z.infer<typeof schema>) {
  return new SendFeedbackDto(
    object.email,
    object.name,
    object.message,
  )
}
