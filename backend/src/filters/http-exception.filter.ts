// backend/src/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Определяем сообщение об ошибке
    let message: string | string[] = 'Internal server error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse; // Если строка — используем её
    } else if (
      exceptionResponse &&
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      // Если объект с полем message — используем его
      message = (exceptionResponse as { message: string | string[] }).message;
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      status: status,
      error: HttpStatus[status] || 'Unknown Error', // Например, 'Bad Request' для 400
      message: message,
    });
  }
}
