const { createLogger, format, transports } = require('winston');


/**
 * Winston logger instance with configured transports and formats
 * @constant logger
 * @type {object}
 * @property {Stream} stream - Morgan stream interface for HTTP request logging
 */

const logger = createLogger({
  level: 'info',     // Minimum log level to capture
  format: format.combine(
    format.timestamp(),      // Add timestamp to logs
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;      // Custom log format
    })
  ),
  transports: [
    new transports.Console(),  //log to console
    new transports.File({ filename: 'logs/error.log', level: 'error' }), //error log
    new transports.File({ filename: 'logs/combined.log' })              //all logs
  ]
});

// Morgan stream interface for HTTP request logging
logger.stream = {
  write: (message) => {
    logger.info(message.trim()); // Trim newlines from Morgan output
  }
};

module.exports = logger;