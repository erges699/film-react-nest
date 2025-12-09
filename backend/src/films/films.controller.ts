// backend/src/films/films.controller.ts
import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Controller('afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFilms(): Promise<FilmsResponseDto> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFilmSchedule(
    @Param('id') filmId: string,
  ): Promise<ScheduleResponseDto> {
    return this.filmsService.getScheduleById(filmId);
  }
}
