// backend/src/films/films.service.ts
import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../database/repositories/film.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async getAllFilms(): Promise<FilmsResponseDto> {
    const films = await this.filmRepository.findAll();
    return {
      total: films.length,
      items: films.map((film) => ({
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

  async getScheduleById(filmId: string): Promise<ScheduleResponseDto | null> {
    const film = await this.filmRepository.findById(filmId);
    if (!film) return null;

    return {
      total: film.schedule.length,
      items: film.schedule.map((session) => ({
        ...session,
        daytime: session.daytime.toISOString(),
      })),
    };
  }
}
