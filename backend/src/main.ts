import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/afisha");
  app.useGlobalPipes(new ValidationPipe()); 
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

