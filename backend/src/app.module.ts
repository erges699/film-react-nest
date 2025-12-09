// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

import { configProvider } from './app.config.provider';

@Module({
  imports: [
    // Глобальная конфигурация
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),

    // Статика
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),

    // Модуль БД (подключает TypeORM или Mongoose в зависимости от DATABASE_DRIVER)
    DatabaseModule,

    // Бизнес-модули
    FilmsModule,
    OrderModule,
  ],
  providers: [configProvider],
})
export class AppModule {}

