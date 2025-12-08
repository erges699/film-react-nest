// backend/src/entity/order.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn('varchar', { length: 36 })
  id: string;

  @Column('varchar', { length: 36, nullable: false })
  film: string;

  @Column('varchar', { length: 36, nullable: false })
  session: string;

  @Column('timestamptz', { nullable: false })
  daytime: Date;

  @Column('integer', { nullable: false })
  row: number;

  @Column('integer', { nullable: false })
  seat: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
