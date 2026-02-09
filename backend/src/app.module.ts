import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { JoiPipeModule } from 'nestjs-joi';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'),
    }),
    JoiPipeModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
