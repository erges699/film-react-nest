import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { inspect } from 'util';
import { LOGGER_PREFIX, LOGGER_CONTEXT } from './logger.constants';

@Injectable()
export class JsonLogger implements LoggerService {
  constructor(
    @Inject(LOGGER_PREFIX) private prefix: string,
    @Inject(LOGGER_CONTEXT) private context: string,
  ) {}

  private formatMessage(
    level: string,
    message: unknown,
    params: unknown[] = [],
    extraContext?: string,
  ): string {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: [this.prefix, this.context, extraContext]
        .filter(Boolean)
        .join('|'),
      params: params.length > 0 ? params : undefined,
      pid: process.pid,
    };

    return inspect(logEntry, {
      depth: null,
      colors: false,
      compact: false,
    });
  }

  log(message: unknown, ...params: unknown[]): void {
    console.log(this.formatMessage('log', message, params));
  }

  error(message: unknown, trace?: string, context?: string): void {
    const params = trace ? [trace] : [];
    if (context) params.push(context);
    console.error(this.formatMessage('error', message, params));
  }

  warn(message: unknown, ...params: unknown[]): void {
    console.warn(this.formatMessage('warn', message, params));
  }

  debug(message: unknown, ...params: unknown[]): void {
    console.debug(this.formatMessage('debug', message, params));
  }

  verbose(message: unknown, ...params: unknown[]): void {
    console.log(this.formatMessage('verbose', message, params));
  }
}
