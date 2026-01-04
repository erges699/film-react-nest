// backend/src/films/schemas/film.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({
    type: [
      {
        id: { type: String, required: true },
        daytime: { type: Date, required: true },
        hall: { type: Number, required: true },
        rows: { type: Number, required: true },
        seats: { type: Number, required: true },
        price: { type: Number, required: true },
        taken: { type: [String], default: [] },
      },
    ],
    required: true,
  })
  schedule: {
    id: string;
    daytime: Date;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }[];
}

export type FilmDocument = Film & Document;
export const FilmSchema = SchemaFactory.createForClass(Film);
