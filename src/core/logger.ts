import runtimeConfig from '@config';

enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  ERROR = 'error',
}

/**
 * Logger class provides static methods for logging messages at various log levels.
 * The log level can be set using the `LOG_LEVEL` environment variable.
 * 
 * Available log levels are defined in the `LogLevel` enum.
 * 
 * Methods:
 * - `trace(message: string, ...args: string[]): void`: Logs a trace level message.
 * - `debug(message: string, ...args: string[]): void`: Logs a debug level message.
 * - `info(message: string, ...args: string[]): void`: Logs an info level message.
 * - `error(message: string, ...args: string[]): void`: Logs an error level message.
 * 
 * Private Methods:
 * - `getLogLevel(): LogLevel`: Retrieves the current log level from the environment variable.
 * - `shouldLog(level: LogLevel): boolean`: Determines if a message should be logged based on the current log level.
 * - `formatMessage(message: string, ...args: string[]): string`: Formats a message by replacing `{}` placeholders with provided arguments.
 */
class Logger {
  private static getLogLevel(): LogLevel {
    return (runtimeConfig.LOG_LEVEL as LogLevel) || LogLevel.INFO;
  }

  private static shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) >= levels.indexOf(Logger.getLogLevel());
  }

  private static formatMessage(message: string, ...args: string[]): string {
    return message.replace(/{}/g, () => args.shift() ?? '{}');
  }

  static trace(message: string, ...args: string[]): void {
    if (Logger.shouldLog(LogLevel.TRACE)) {
      console.trace(`[TRACE] ${new Date().toISOString()} - ${Logger.formatMessage(message, ...args)}`);
    }
  }

  static debug(message: string, ...args: string[]): void {
    if (Logger.shouldLog(LogLevel.DEBUG)) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${Logger.formatMessage(message, ...args)}`);
    }
  }

  static info(message: string, ...args: string[]): void {
    if (Logger.shouldLog(LogLevel.INFO)) {
      console.info(`[INFO] ${new Date().toISOString()} - ${Logger.formatMessage(message, ...args)}`);
    }
  }

  static error(message: string, ...args: string[]): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${Logger.formatMessage(message, ...args)}`);
  }
}

export default Logger;
