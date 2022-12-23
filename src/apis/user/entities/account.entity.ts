import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('account')
export class AccountEntity extends BaseEntity {
  //PK가 될 수 있는 조건 2 개
  //1. auto increment
  //2. uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128, name: 'password', nullable: false })
  password: string;

  @Column({ length: 25, name: 'email', nullable: false })
  email: string;

  @Column({ length: 1, name: 'gender', nullable: false })
  gender: string;

  @Column({ length: 15, name: 'phone_num', nullable: false })
  phoneNum: string;

  @Column({ type: Date, name: 'birth_date' })
  birthDate: Date;

  @Column({ name: 'level', default: 1 })
  level: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @OneToMany(() => ProfileEntity, (profile) => profile.account)
  profile: ProfileEntity[];
}
