import mongoose, { Mongoose } from 'mongoose';
import { AppRepository, FilmsRepository } from '../app.repository.provider';
import debug from 'debug';
import { FilmsMongoDbRepository } from './films.mongodb.repository';
import { AppConfigDatabase } from '../app.config.provider';

export class MongoDbRepository implements AppRepository {
  private connection: Mongoose;

  films: FilmsRepository;

  constructor(config: AppConfigDatabase) {
    (async () => {
      try {
        this.connection = await mongoose.connect(config.url);
        this.films = new FilmsMongoDbRepository(this.connection);
      } catch (error) {
        debug('mongo')('error while connecting to databse', error);
      }
    })();
  }
}
