// backend/src/app.config.provider.ts
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const configProvider: Provider = {
  provide: 'CONFIG',
  useFactory: (configService: ConfigService) => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER'),
      // Конфигурация для PostgreSQL
      postgres: {
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
      },
      // Конфигурация для MongoDB
      mongodb: {
        url: configService.get<string>('DATABASE_URL'),
      },
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  postgres: PostgresConfig;
  mongodb: MongodbConfig;
}

export interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface MongodbConfig {
  url: string;
}

