import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/schemas/film.schema';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id }).exec();
  }

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  // Метод для обновления списка занятых мест
  async updateTakenSeats(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<void> {
    await this.filmModel.updateOne(
      {
        id: filmId,
        'schedule.id': sessionId,
      },
      {
        $push: { 'schedule.$.taken': `${row}-${seat}` },
      },
    );
  }
}
export { Film };
