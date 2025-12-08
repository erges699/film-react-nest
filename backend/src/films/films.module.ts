// backend/src/films/films.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmRepository } from '../database/repositories/film.repository';

// Для MongoDB
// import { Film, FilmSchema } from './schemas/film.schema';

// Для PostgreSQL
import { FilmEntity } from '../entity/film.entity';

@Module({
  imports: [
    // Импорт репозитория (работает с любой СУБД)
    TypeOrmModule.forFeature([FilmEntity]),
    // MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmRepository],
  exports: [FilmRepository],
})
export class FilmsModule {}

