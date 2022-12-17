import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeasonEntity } from './season.entity';
import { WatchingEntity } from '../../history/entities/watching.entity';

@Entity('episode')
export class EpisodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, name: 'name', nullable: false })
  name: string;

  @Column({ type: 'text', name: 'detail', nullable: false })
  detail: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => SeasonEntity, (season) => season.id, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'season_id' })
  season: SeasonEntity;

  @OneToMany(() => WatchingEntity, (watching) => watching.id)
  watching: WatchingEntity[];
}
