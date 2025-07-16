export enum LogLevel {
  INFO = 'INFO',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export interface ILogger {
  log(level: LogLevel, message: string): void;
  info(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}

export class ConsoleLogger implements ILogger {
  log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`);
  }

  info(message: string): void {
    this.log(LogLevel.INFO, message);
  }

  error(message: string): void {
    this.log(LogLevel.ERROR, message);
  }

  debug(message: string): void {
    this.log(LogLevel.DEBUG, message);
  }
}
