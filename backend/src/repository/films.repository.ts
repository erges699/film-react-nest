import { Injectable } from '@nestjs/common';

export interface Film {
  id: string;
  rating_score: number;
  movie_director: string;
  keywords: string[];
  photo: string;
  cover_photo: string;
  title: string;
  synopsis: string;
  full_description: string;
  calendar: Schedule[];
}

@Injectable()
export class FilmsRepository {
  private films: Film[] = [];

  save(film: Omit<Film, 'id'>) {
    if (this.films.find((f) => f.title === film.title)) {
      throw new Error('Film already exists');
    }

    const filmWithId = { ...film, id: uuid() };

    this.films.push(filmWithId);

    return filmWithId;
  }

  findById(id: string) {
    return this.films.find((film) => film.id === id);
  }

  findAll() {
    return this.films;
  }

  update(id: number, data: Partial<Omit<Film, 'id'>>) {
    const film = this.findById(id);

    Object.assign(film, data);

    return film;
  }

  delete(id: number) {
    this.films = this.films.filter((film) => film.id !== id);
  }
}
