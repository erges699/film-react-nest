// backend/src/order/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type OrderDocument = Order & Document;


@Schema()
export class Order {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  film: string; // ID фильма


  @Prop({ required: true })
  session: string; // ID сеанса


  @Prop({ required: true })
  daytime: Date; // тип Date

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
