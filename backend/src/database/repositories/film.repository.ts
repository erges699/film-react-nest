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
}
