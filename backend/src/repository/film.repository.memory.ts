// backend/src/repository/film.repository.ts работа с массивами в памяти
import { Injectable } from '@nestjs/common';

export interface Film {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: Session[];
}

export interface Session {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

@Injectable()
export class FilmRepository {
  private films: Film[] = [];

  constructor() {
    // Инициализация тестовыми данными
    this.films = require('../../test/mongodb_initial_stub.json');
  }

  findAll(): Film[] {
    return this.films;
  }

  findById(id: string): Film | undefined {
    return this.films.find(film => film.id === id);
  }
}
