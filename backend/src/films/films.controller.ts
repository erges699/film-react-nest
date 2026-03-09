import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetSchedulesDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {};

  @Get()
  async findAll() {
    return await this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findOneSchedules(
    @Param('id', newJoiPipe(Joi.string().required())) id: string,
  ): Promise<GetSchedulesDTO> {
    const film = await this.filmsService.findOne(id);
    return <GetSchedulesDTO>{
      total: film.schedules.length,
      items: film.schedules,
    };
  }
}
