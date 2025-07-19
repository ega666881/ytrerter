import {Bot} from "grammy";
import winston from "winston";
import {getLoggerOptions} from "../../core/logger/config.ts";

export let TelegramBot: Bot

class TelegramTransport {
  private readonly logger = winston.createLogger(getLoggerOptions('http-server'))

  async listen() {
    TelegramBot = new Bot(process.env.TELEGRAM_BOT_TOKEN!)
    TelegramBot.start()

    this.logger.info(`Telegram bot is started`)
  }
}

export default new TelegramTransport()

