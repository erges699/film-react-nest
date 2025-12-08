// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    // Создаём приложение
    const app = await NestFactory.create(AppModule);

    // Получаем конфигурацию
    const configService = app.get(ConfigService);

    // Глобальные настройки
    app.setGlobalPrefix('api/afisha');
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();

    // Получаем порт из конфигурации (с fallback на 3000)
    const port = configService.get<number>('PORT', 3000);

    // Запускаем сервер
    await app.listen(port);

    logger.log(`
🚀 Application is running!
  - Environment: ${process.env.NODE_ENV || 'development'}
  - Database driver: ${configService.get('DATABASE_DRIVER')}
  - URL: http://localhost:${port}/api/afisha
    `);

  } catch (error) {
    logger.error('Failed to start application', error.stack);
    process.exit(1);
  }
}

bootstrap();

