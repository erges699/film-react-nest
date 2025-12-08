// backend/src/order/order.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../database/repositories/order.repository';
import { FilmRepository } from '../database/repositories/film.repository';
import { CreateOrderDto, OrderDto } from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmRepository: FilmRepository,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderDto> {
    const film = await this.filmRepository.findById(dto.film);
    if (!film) {
      throw new BadRequestException(`Фильм с ID ${dto.film} не найден`);
    }

    const session = film.schedule.find((s) => s.id === dto.session);
    if (!session) {
      throw new BadRequestException(
        `Сеанс с ID ${dto.session} не найден в фильме`,
      );
    }

    const isTaken = session.taken.includes(`${dto.row}-${dto.seat}`);
    if (isTaken) {
      throw new BadRequestException(
        `Место ${dto.row}-${dto.seat} уже занято в сеансе ${dto.session}`,
      );
    }

    const order = await this.orderRepository.create({
      ...dto,
      id: this.generateOrderId(),
      daytime: new Date(dto.daytime),
    });

    await this.filmRepository.updateTakenSeats(
      dto.film,
      dto.session,
      dto.row,
      dto.seat,
    );

    return {
      ...order,
      daytime: order.daytime.toISOString(),
    };
  }

  private generateOrderId(): string {
    return uuidv4();
  }
}
