// backend/src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { OrderRepository, Order } from '../repository/order.repository';
import { CreateOrderDto, OrdersResponseDto, OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder(dto: CreateOrderDto): OrderDto {
    const order = this.orderRepository.create(dto);
    return order;
  }

  getAllOrders(): OrdersResponseDto {
    const orders = this.orderRepository.findAll();
    return {
      total: orders.length,
      items: orders,
    };
  }
}
