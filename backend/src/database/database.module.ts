// backend/src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';
import { FilmRepository } from './repositories/film.repository';
import { ScheduleRepository } from './repositories/schedule.repository';
import { FilmEntity } from '../entity/film.entity';
import { ScheduleEntity } from '../entity/schedule.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
  ],
  providers: [FilmRepository, ScheduleRepository],
  exports: [FilmRepository, ScheduleRepository, TypeOrmModule],
})
export class DatabaseModule {}
