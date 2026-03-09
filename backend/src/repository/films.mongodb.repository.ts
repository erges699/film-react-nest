import { Mongoose, Document } from 'mongoose';
import Film from './models/film';
import { GetFilmDTO, GetFilmsDTO, PostFilmDTO } from '../films/dto/films.dto';

export class FilmsMongoDbRepository implements FilmsRepository {
  constructor(private readonly connection: Mongoose) {}

  private getFilmMapperFn(): (Film) => GetFilmDTO {
    return (root) => {
      return <GetFilmDTO>{
        id: root._id,
        director: root.director,
        rating: root.rating,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        schedule: root.schedule,
      };
    };
  }

  private getDtoMapperFn(
    includeId: boolean = true,
  ): (GetFilmDTO, Document) => Document {
    return (dto, doc) => {
      doc.description = dto.description;
      doc.director = dto.director;
      doc.rating = dto.rating;
      doc.tags = dto.tags;
      doc.image = dto.image;
      doc.cover = dto.cover;
      doc.title = dto.title;
      doc.about = dto.about;
      doc.schedule = dto.schedule;
      if (includeId) {
        doc._id = dto.id;
      }
      return doc;
    };
  }

  async findAll(): Promise<GetFilmsDTO> {
    const items = await Film.find({});
    const total = await Film.countDocuments({});
    return {
      page: 0,
      size: 50,
      total,
      items: items.map(this.getFilmMapperFn()),
    };
  }

  async findById(id: string): Promise<GetFilmDTO> {
    const film = await Film.findById(id);
    return film ? this.getFilmMapperFn()(film) : null;
  }

  async save(film: PostFilmDTO): Promise<string> {
    if (film.id) {
      const oldFilm = await Film.findOne({ _id: film.id });
      const updatedFilm = this.getDtoMapperFn(false)(film, oldFilm);
      await updatedFilm.save();
      return film.id;
    } else {
      throw new Error('Film not found');
    }
  }
}
