// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

import { configProvider } from './app.config.provider';


// Логгеры
import { DevLogger } from './loggers/dev.logger';
import { JsonLogger } from './loggers/json.logger';
import { TskvLogger } from './loggers/tskv.logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    DatabaseModule,
    FilmsModule,
    OrderModule,
  ],
  providers: [
    configProvider,
    DevLogger,
    {
      provide: 'JsonLogger',
      useClass: JsonLogger,
    },
    {
      provide: 'TskvLogger',
      useClass: TskvLogger,
    },
  ],
  exports: ['JsonLogger', 'TskvLogger'],
})
export class AppModule {}
