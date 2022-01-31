import { User } from '@modules/users/infra/typeorm/entities/User';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Event } from './Event';

@Entity()
export class Like {
  @ManyToOne(() => User, user => user.likes, {
    nullable: false,
    eager: true,
    primary: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Event, event => event.likes, {
    nullable: false,
    eager: true,
    primary: true,
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
