// backend/src/database/repositories/order.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../entity/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repo: Repository<OrderEntity>,
  ) {}

  async create(data: Partial<OrderEntity>): Promise<OrderEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }
}
