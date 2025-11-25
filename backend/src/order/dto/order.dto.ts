//TODO реализовать DTO для /orders
import { IsNotEmpty, IsString, IsNumber, IsDate, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { isUUID } from 'class-validator';


export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Validate(isUUID, { message: 'Film ID must be a valid UUID' })
  film: string;


  @IsNotEmpty()
  @IsString()
  @Validate(isUUID, { message: 'Session ID must be a valid UUID' })
  session: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  daytime: Date;


  @IsNotEmpty()
  @IsNumber()
  row: number;

  @IsNotEmpty()
  @IsNumber()
  seat: number;

  @IsNotEmpty()
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
