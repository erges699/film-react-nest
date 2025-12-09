// backend/src/order/order.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderDto, OrdersResponseDto } from './dto/order.dto';

@Controller('afisha/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  )
  async createOrders(
    @Body() dto: CreateOrderDto[],
  ): Promise<OrdersResponseDto> {
    const createdOrders: OrderDto[] = [];

    for (const orderDto of dto) {
      try {
        const order = await this.orderService.createOrder(orderDto);
        createdOrders.push(order);
      } catch (error) {
        // Если это ошибка валидации или занятости места — отдаём 400
        if (
          error instanceof BadRequestException ||
          error instanceof UnauthorizedException
        ) {
          throw error;
        }

        // Для всех остальных ошибок (БД и пр.) — 500
        throw new InternalServerErrorException(
          'Произошла ошибка при обработке заказа',
        );
      }
    }

    return {
      total: createdOrders.length,
      items: createdOrders,
    };
  }
}
