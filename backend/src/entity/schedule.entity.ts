// backend/src/entity/schedule.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  externalId: string;

  @Column('timestamptz', { nullable: false })
  daytime: Date;

  @Column('integer', { nullable: false })
  hall: number;

  @Column('integer', { nullable: false })
  rows: number;

  @Column('integer', { nullable: false })
  seats: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('simple-array', { default: '{}' })
  taken: string[];

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'filmId', referencedColumnName: 'id' })
  film: FilmEntity;
}
