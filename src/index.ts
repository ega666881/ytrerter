import dotenv from 'dotenv'
import Database from './core/database/database.ts'
import HttpTransport from "./transport/http";
import TelegramTransport from "./transport/telegram";

dotenv.config()
Database.connect()
HttpTransport.listen()
TelegramTransport.listen()
