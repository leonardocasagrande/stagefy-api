import { AbstractEntity } from '@shared/entities/abstractEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Professional } from './../../../../users/infra/typeorm/entities/Professional';
import { Like } from './Like';

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

  @Column('integer', { nullable: false, default: 0 })
  currentViews: number;

  @Column('timestamp with time zone', { nullable: true })
  startedAt: Date;

  @Column('timestamp with time zone', { nullable: true })
  finishedAt: Date;

  @Column('integer', { nullable: true, default: null })
  streamerPeerId: number;

  @OneToMany(() => Like, like => like.event)
  likes: Like[];
}
