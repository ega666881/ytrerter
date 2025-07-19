import {SendFeedbackDto} from "./dto";
import {TelegramBot} from "../../transport/telegram";

export namespace FeedbackService {
  export async function send(dto: SendFeedbackDto): Promise<void> {
    const message = `👤 <b>Имя</b>: ${dto.name}\n` +
      `✉️ <b>Email</b>: ${dto.email}\n` +
      `💬 <b>Сообщение</b>:\n` +
      `${dto.message}`

    await TelegramBot.api.sendMessage(
      process.env.TELEGRAM_CHAT_ID!,
      message,
      {parse_mode: 'HTML'}
    )
  }
}
