//TODO реализовать DTO для /orders
import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDate()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class OrderDto {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrdersResponseDto {
  total: number;
  items: OrderDto[];
}
