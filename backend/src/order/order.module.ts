import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // ← Добавьте импорт
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from '../repository/order.repository';
import { FilmsModule } from '../films/films.module';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    FilmsModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
