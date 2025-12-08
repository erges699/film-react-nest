// backend/src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './typeorm/typeorm.module';
import { FilmRepository } from './repositories/film.repository';
import { ScheduleRepository } from './repositories/schedule.repository';

@Module({
  imports: [TypeOrmConfigModule],
  providers: [FilmRepository, ScheduleRepository],
  exports: [FilmRepository, ScheduleRepository],
})
export class DatabaseModule {}
