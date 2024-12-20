import { LogLevel } from './types';

export class RemotionLogger {
  private static instance: RemotionLogger;
  private logLevel: LogLevel = 'info';

  static getInstance(): RemotionLogger {
    if (!this.instance) {
      this.instance = new RemotionLogger();
    }
    return this.instance;
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog('info')) {
      console.info(`[Remotion Info] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog('warn')) {
      console.warn(`[Remotion Warning] ${message}`, ...args);
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog('error')) {
      console.error(`[Remotion Error] ${message}`);
      if (error) {
        console.error('Details:', error);
      }
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog('debug')) {
      console.debug(`[Remotion Debug] ${message}`, ...args);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }
}