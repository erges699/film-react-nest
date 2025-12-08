import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  // TypeORM (PostgreSQL)
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => {
      const driver = config.get<string>('DATABASE_DRIVER');
      
      if (driver === 'postgres') {
        return {
          type: 'postgres',
          host: config.get<string>('POSTGRES_HOST'),
          port: config.get<number>('POSTGRES_PORT'),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          database: config.get<string>('POSTGRES_DB'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        };
      }
      return null;
    },
    inject: [ConfigService],
  }),

  // Mongoose (MongoDB)
  // MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   useFactory: (config: ConfigService) => {
  //     const driver = config.get<string>('DATABASE_DRIVER');
  //     
  //     return driver === 'mongodb'
  //       ? { uri: config.get<string>('DATABASE_URL') }
  //       : { uri: '' };
  //   },
  //   inject: [ConfigService],
  // }),
];
