// backend/src/films/films.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmEntity } from '../entity/film.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([FilmEntity])],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [],
})
export class FilmsModule {}
