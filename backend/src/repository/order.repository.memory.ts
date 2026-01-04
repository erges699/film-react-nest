// backend/src/repository/order.repository.ts работа с массивами в памяти
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface Order {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];

  create(order: Omit<Order, 'id'>): Order {
    const newOrder = {
      ...order,
      id: uuid(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll(): Order[] {
    return this.orders;
  }
}
