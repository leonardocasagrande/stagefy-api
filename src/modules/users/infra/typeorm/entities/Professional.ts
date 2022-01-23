import { Event } from '@modules/events/infra/typeorm/entities/Event';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Professional {
  @OneToOne(() => User, user => user.professional, {
    cascade: true,
    primary: true,
    eager: true,
  })
  @JoinColumn({ name: 'id' })
  user: User;

  @Column('varchar', { length: 2048, nullable: false })
  bio: string;

  @Column('varchar', { length: 512, nullable: false })
  artisticName: string;

  @Column('varchar', { length: 128, nullable: false })
  zipcode: string;

  @Column('varchar', { length: 128, nullable: false })
  birthday: string;

  @Column('bool', { nullable: true, default: null })
  accepted: boolean;

  @OneToMany(() => Event, event => event.professional)
  events: Event[];
}
