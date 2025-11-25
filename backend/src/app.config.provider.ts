import { ConfigModule, ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const configProvider: Provider = {
  
  provide: 'CONFIG',
  useFactory: (configService: ConfigService) => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER'),
      url: configService.get<string>('DATABASE_URL'),
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
