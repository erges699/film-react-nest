// backend/src/order/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  film: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  daytime: Date;

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
