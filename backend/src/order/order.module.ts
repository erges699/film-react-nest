// backend/src/order/order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from '../database/database.module';

// Для PostgreSQL
import { OrderEntity } from '../entity/order.entity';

// Для MongoDB
import { Order, OrderSchema } from './schemas/order.schema';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [
    // Импорт зависимостей
    FilmsModule,
    DatabaseModule,

    // Конфигурация для TypeORM (PostgreSQL)
    TypeOrmModule.forFeature([OrderEntity]),

    // Конфигурация для Mongoose (MongoDB)
    // MongooseModule.forFeature([
    //   { name: Order.name, schema: OrderSchema },
    // ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
