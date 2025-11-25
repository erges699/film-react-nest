// backend/src/films/films.service.ts
import { Injectable } from '@nestjs/common';
import { FilmRepository, Film, Session } from '../repository/film.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  getAllFilms(): FilmsResponseDto {
    const films = this.filmRepository.findAll();
    return {
      total: films.length,
      items: films.map(film => ({
        id: film.id,
        rating: film.rating,
        director: film.director,
        tags: film.tags,
        title: film.title,
        about: film.about,
        description: film.description,
        image: film.image,
        cover: film.cover,
      })),
    };
  }

  getScheduleById(filmId: string): ScheduleResponseDto | null {
    const film = this.filmRepository.findById(filmId);
    if (!film) return null;

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
