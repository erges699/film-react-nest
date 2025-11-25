// backend/src/films/films.controller.ts
import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllFilms(): FilmsResponseDto {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  @HttpCode(HttpStatus.OK)
  getFilmSchedule(@Param('id') filmId: string): ScheduleResponseDto | null {
    const schedule = this.filmsService.getScheduleById(filmId);
    if (!schedule) {
      return null;
    }
    return schedule;
  }
}
