// backend/src/entity/film.entity.ts
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('decimal', { precision: 3, scale: 1, nullable: false })
  rating: number;

  @Column('varchar', { length: 255, nullable: false })
  director: string;

  @Column('simple-array', { nullable: false })
  tags: string[];

  @Column('varchar', { length: 255, nullable: false })
  title: string;

  @Column('text', { nullable: false })
  about: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('varchar', { length: 512, nullable: false })
  image: string;

  @Column('varchar', { length: 512, nullable: false })
  cover: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film)
  schedule: ScheduleEntity[];
}
