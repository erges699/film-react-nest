// backend/src/loggers/tskv.logger.ts
import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { TSKV_LOGGER_CONTEXT } from './logger.constants';

@Injectable()
export class TskvLogger implements LoggerService {
  private readonly defaultContext?: string;

  constructor(@Inject(TSKV_LOGGER_CONTEXT) context?: string) {
    this.defaultContext = context;
  }

  /**
   * Формирует TSKV-строку (Tab-Separated Key-Value)
   * @param level Уровень логирования
   * @param message Текст сообщения
   * @param context Контекст (опционально)
   * @param stack Стек вызова (для ошибок)
   * @returns TSKV-строка с завершающим \n
   */
  private format(
    level: string,
    message: unknown,
    context?: string,
    stack?: string,
  ): string {
    const timestamp = new Date().toISOString();

    const fields: string[] = [
      `timestamp=${this.escapeValue(timestamp)}`,
      `level=${this.escapeValue(level)}`,
      `message=${this.escapeValue(this.stringify(message))}`,
    ];

    if (context) fields.push(`context=${this.escapeValue(context)}`);
    if (stack) fields.push(`stack=${this.escapeValue(stack)}`);

    return fields.join('\t') + '\n';
  }

  /**
   * Экранирует спецсимволы в значении
   * @param value Строка для экранирования
   * @returns Экранированная строка
   */
  private escapeValue(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
      .replace(/\r/g, '\\r');
  }

  /**
   * Преобразует любое значение в строку
   * @param value Любое значение
   * @returns Строковое представление
   */
  private stringify(value: unknown): string {
    if (value === null || value === undefined) return String(value);
    if (typeof value === 'string') return value;
    if (value instanceof Error) return value.stack || value.message;
    return JSON.stringify(value, (key, value) => {
      if (typeof value === 'bigint') return value.toString();
      if (value instanceof Date) return value.toISOString();
      return value;
    });
  }

  log(message: unknown, context?: string): void {
    process.stdout.write(
      this.format('log', message, context || this.defaultContext),
    );
  }

  error(message: unknown, trace?: string, context?: string): void {
    process.stderr.write(
      this.format('error', message, context || this.defaultContext, trace),
    );
  }

  warn(message: unknown, context?: string): void {
    process.stdout.write(
      this.format('warn', message, context || this.defaultContext),
    );
  }

  debug(message: unknown, context?: string): void {
    process.stdout.write(
      this.format('debug', message, context || this.defaultContext),
    );
  }

  verbose(message: unknown, context?: string): void {
    process.stdout.write(
      this.format('verbose', message, context || this.defaultContext),
    );
  }
}
