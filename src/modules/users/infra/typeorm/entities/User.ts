import { Professional } from './Professional';
import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';
import { AbstractEntity } from '@shared/entities/abstractEntity';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Like } from '@modules/events/infra/typeorm/entities/Like';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 512, nullable: false })
  name: string;

  @Column('varchar', { length: 256, unique: true, nullable: false })
  @Index()
  email: string;

  @Column('varchar', { length: 1024, nullable: false })
  @Exclude()
  password: string;

  @Column('varchar', { length: 256, nullable: true })
  phone: string;

  @Column('varchar', { length: 1024, nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: ProfileRoleEnum,
    default: ProfileRoleEnum.Student,
  })
  profileRole: ProfileRoleEnum;

  @OneToOne(() => Professional, professional => professional.user)
  professional: Professional;

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
}
