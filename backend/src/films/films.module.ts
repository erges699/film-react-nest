// backend/src/films/films.module.ts
import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmRepository } from '../repository/film.repository';

@Module({
  controllers: [FilmsController],
  providers: [FilmsService, FilmRepository],
  exports: [FilmsService],
})
export class FilmsModule {}
