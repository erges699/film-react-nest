// backend/src/database/repositories/order.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Для PostgreSQL
import { OrderEntity } from '../../entity/order.entity';

// Для MongoDB
import { Order, OrderDocument } from '../../order/schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    // Репозиторий TypeORM для PostgreSQL
    @InjectRepository(OrderEntity)
    private readonly typeormRepo: Repository<OrderEntity>,

    // Модель Mongoose для MongoDB
    @InjectModel(Order.name)
    private readonly mongooseModel: Model<OrderDocument>,
  ) {}

  /**
   * Создание заказа в выбранной СУБД
   * @param order - данные заказа
   * @returns сохранённый объект заказа
   */
  async create(order: Order | OrderEntity): Promise<Order | OrderEntity> {
    const driver = process.env.DATABASE_DRIVER;

    if (driver === 'postgres') {
      return this.typeormRepo.save(order as OrderEntity);
    } else if (driver === 'mongodb') {
      const createdOrder = new this.mongooseModel(order);
      return createdOrder.save();
    }

    throw new Error(`Unsupported database driver: ${driver}`);
  }

  /**
   * Получение всех заказов из выбранной СУБД
   * @returns массив заказов
   */
  async findAll(): Promise<(Order | OrderEntity)[]> {
    const driver = process.env.DATABASE_DRIVER;

    if (driver === 'postgres') {
      return this.typeormRepo.find();
    } else if (driver === 'mongodb') {
      return this.mongooseModel.find().exec();
    }

    throw new Error(`Unsupported database driver: ${driver}`);
  }

  /**
   * Поиск заказа по ID в выбранной СУБД
   * @param id - идентификатор заказа
   * @returns найденный заказ или null
   */
  async findById(id: string): Promise<(Order | OrderEntity) | null> {
    const driver = process.env.DATABASE_DRIVER;

    if (driver === 'postgres') {
      return this.typeormRepo.findOne({ where: { id } });
    } else if (driver === 'mongodb') {
      return this.mongooseModel.findById(id).exec();
    }

    throw new Error(`Unsupported database driver: ${driver}`);
  }

  /**
   * Обновление заказа в выбранной СУБД
   * @param id - идентификатор заказа
   * @param updateData - данные для обновления
   * @returns обновлённый заказ
   */
  async update(
    id: string,
    updateData: Partial<Order | OrderEntity>,
  ): Promise<Order | OrderEntity> {
    const driver = process.env.DATABASE_DRIVER;

    if (driver === 'postgres') {
      await this.typeormRepo.update(id, updateData as Partial<OrderEntity>);
      return this.typeormRepo.findOne({ where: { id } });
    } else if (driver === 'mongodb') {
      const updatedOrder = await this.mongooseModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
      if (!updatedOrder) {
        throw new Error('Order not found');
      }
      return updatedOrder;
    }

    throw new Error(`Unsupported database driver: ${driver}`);
  }

  /**
   * Удаление заказа в выбранной СУБД
   * @param id - идентификатор заказа
   */
  async delete(id: string): Promise<void> {
    const driver = process.env.DATABASE_DRIVER;

    if (driver === 'postgres') {
      await this.typeormRepo.delete(id);
    } else if (driver === 'mongodb') {
      const result = await this.mongooseModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new Error('Order not found');
      }
    } else {
      throw new Error(`Unsupported database driver: ${driver}`);
    }
  }
}
