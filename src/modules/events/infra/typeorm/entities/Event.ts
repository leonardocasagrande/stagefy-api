import { AbstractEntity } from '@shared/entities/abstractEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Professional } from './../../../../users/infra/typeorm/entities/Professional';

@Entity()
export class Event extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 512, nullable: false })
  name: string;

  @ManyToOne(() => Professional, professional => professional.events, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'professional_id' })
  professional: Professional;

  @Column('varchar', { length: 512, nullable: false })
  image: string;

  @Column('timestamp with time zone', { nullable: false })
  date: Date;

  @Column('integer', { nullable: false, default: 0 })
  views: number;
}
