import winston, {LoggerOptions} from "winston";

const getLoggerOptions = (service: string): LoggerOptions => ({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: {
    service: service,
  },
  transports: [
    new winston.transports.Console({})
  ]
})

export {
  getLoggerOptions
}
