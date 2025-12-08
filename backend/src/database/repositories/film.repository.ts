// backend/src/database/repositories/film.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../../entity/film.entity';
import { FilmsRepository } from './films.repository.interface';

@Injectable()
export class FilmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly repo: Repository<FilmEntity>,
  ) {}

  async findById(id: string): Promise<FilmEntity> {
    return this.repo.findOne({ where: { id } });
  }

  async findAll(): Promise<FilmEntity[]> {
    return this.repo.find();
  }

  async create(data: Partial<FilmEntity>): Promise<FilmEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: string, data: Partial<FilmEntity>): Promise<FilmEntity> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<void> {
    // 1. Получаем фильм со всеми сеансами
    const film = await this.repo.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    if (!film) {
      throw new Error(`Film with ID ${filmId} not found`);
    }

    // 2. Ищем нужный сеанс в расписании
    const session = film.schedule.find((s) => s.id === sessionId);
    if (!session) {
      throw new Error(
        `Session with ID ${sessionId} not found in film ${filmId}`,
      );
    }

    // 3. Обновляем занятые места
    const takenSeat = `${row}-${seat}`;
    if (!session.taken.includes(takenSeat)) {
      session.taken.push(takenSeat);
    }

    await this.repo.save(film);
  }
}
