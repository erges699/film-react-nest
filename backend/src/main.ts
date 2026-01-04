// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
//import { JsonLogger } from './loggers/json.logger';
import { TskvLogger } from './loggers/tskv.logger';

async function bootstrap() {
  const logger = new TskvLogger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule, {
      logger,
    });

    const configService = app.get(ConfigService);

    app.setGlobalPrefix('api/');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();

    const port = configService.get<number>('PORT', 3000);
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
