// backend/src/order/order.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrdersResponseDto } from './dto/order.dto';


@Controller('api/afisha/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  createOrders(
    @Body(new ValidationPipe({ whitelist: true }))
    dto: CreateOrderDto[],
  ): OrdersResponseDto {
    const createdOrders = dto.map((order) =>
      this.orderService.createOrder(order),
    );

    return {
      total: createdOrders.length,
      items: createdOrders,
    };
  }
}
