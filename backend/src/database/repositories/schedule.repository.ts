// backend/src/database/repositories/schedule.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from '../../entity/schedule.entity';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly repo: Repository<ScheduleEntity>,
  ) {}

  async findByFilmId(filmId: string): Promise<ScheduleEntity[]> {
    return this.repo.find({ where: { film: { id: filmId } } });
  }

  async create(data: Partial<ScheduleEntity>): Promise<ScheduleEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async deleteByFilmId(filmId: string): Promise<void> {
    await this.repo.delete({ film: { id: filmId } });
  }
}
