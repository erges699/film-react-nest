// backend/src/repository/film.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from '../entity/film.entity';
// import { ScheduleEntity } from '../entity/schedule.entity';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  async findById(id: string): Promise<FilmEntity | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'], // Загружаем связанные сеансы
    });
  }

  async findAll(): Promise<FilmEntity[]> {
    return this.filmRepository.find({
      relations: ['schedule'],
    });
  }

  /**
   * Обновление списка занятых мест для конкретного сеанса
   * @param filmId ID фильма
   * @param sessionId ID сеанса
   * @param row Номер ряда
   * @param seat Номер места
   */
  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<void> {
    // 1. Получаем фильм со всеми сеансами
    const film = await this.filmRepository.findOne({
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

    await this.filmRepository.save(film);
  }
}
