import { Injectable, LoggerService } from '@nestjs/common';
import { inspect } from 'util';

@Injectable()
export class JsonLogger implements LoggerService {
  private readonly context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  /**
   * Формирует структурированное лог‑сообщение в формате JSON
   * @param level Уровень логирования
   * @param message Основное сообщение
   * @param params Дополнительные параметры
   * @returns JSON‑строка с логом
   */
    private formatMessage(
    level: string,
    message: unknown,
    params: unknown[] = [],
    extraContext?: string
    ): string {
    const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context: extraContext ? `${this.context}|${extraContext}` : this.context,
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
