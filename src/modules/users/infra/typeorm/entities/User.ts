import { AbstractEntity } from '@shared/entities/abstractEntity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileRoleEnum } from '@modules/users/dtos/enum/ProfileRoleEnum';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 512, nullable: false })
  name: string;

  @Column('varchar', { length: 256, unique: true, nullable: false })
  @Index()
  email: string;

  @Column('varchar', { length: 1024, nullable: true })
  @Exclude()
  password: string;

  @Column('varchar', { length: 256 })
  phone: string;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ProfileRoleEnum,
    default: ProfileRoleEnum.Student,
  })
  profileRole: ProfileRoleEnum;
}
