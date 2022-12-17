import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity('profile')
export class ProfileEntity extends BaseEntity {
  //PK가 될 수 있는 조건 2 개
  //1. auto increment
  //2. uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 10, name: 'name', nullable: false })
  name: string;

  @Column({ length: 256, name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column({ length: 15, name: 'language', nullable: false })
  language: string;

  @Column({ type: 'integer', name: 'age_limit', nullable: false })
  ageLimit: number;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => AccountEntity, (account) => account.id)
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
}
