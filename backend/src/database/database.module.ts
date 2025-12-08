// backend/src/database/database.module.ts
// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';
import { FilmRepository } from './repositories/film.repository';
import { ScheduleRepository } from './repositories/schedule.repository';
import { OrderRepository } from './repositories/order.repository'; // ← Путь исправлен!
import { FilmEntity } from '../entity/film.entity';
import { ScheduleEntity } from '../entity/schedule.entity';
import { OrderEntity } from '../entity/order.entity'; // ← Импорт сущности

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      FilmEntity,
      ScheduleEntity,
      OrderEntity, // ← Добавляем OrderEntity!
    ]),
  ],
  providers: [FilmRepository, ScheduleRepository, OrderRepository],
  exports: [FilmRepository, ScheduleRepository, OrderRepository, TypeOrmModule],
})
export class DatabaseModule {}
