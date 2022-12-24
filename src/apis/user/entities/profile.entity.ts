import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { PreferenceEntity } from '../../preference/entities/preference.entity';
import { PickedContentsEntity } from '../../preference/entities/picked-contents.entity';
import { HistoryEntity } from '../../history/entities/history.entity';
import { WatchingEntity } from '../../history/entities/watching.entity';

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

  @Column({ type: 'integer', name: 'level', default: 2 })
  level: number;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => AccountEntity, (account) => account.id, {
    createForeignKeyConstraints: false,
  })
  @Index()
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @OneToMany(() => PreferenceEntity, (preference) => preference.id)
  preference: PreferenceEntity[];

  @OneToMany(() => PickedContentsEntity, (pickedContents) => pickedContents.id)
  pickedContents: PickedContentsEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.id)
  history: HistoryEntity[];

  @OneToMany(() => WatchingEntity, (watching) => watching.id)
  watching: WatchingEntity[];
}
