const winston = require('winston');
const path = require('path');
const dateFormat = require('src/utils/DateFormat');
const AmqpLogger = require('./AmqpLogger');

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `[${dateFormat(info.timestamp)}][${info.level}] - ${info.message}`
  )
);

module.exports = () =>
  winston.createLogger({
    transports: [
      new winston.transports.Console({
        format,
      }),
      new winston.transports.File({
        dirname: path.join('logs'),
        level: 'info',
        format,
        maxsize: 100000,
        maxFiles: 100,
        filename: '.log',
      }),
      new AmqpLogger({}),
    ],
  });
