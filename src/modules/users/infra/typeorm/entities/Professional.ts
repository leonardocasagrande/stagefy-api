import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Professional {
  @OneToOne(() => User, { cascade: true, primary: true })
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

  @Column('bool', { nullable: false })
  accepted: boolean;
}
