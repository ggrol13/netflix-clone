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
import { SeasonEntity } from './season.entity';

@Entity('episode')
export class EpisodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, name: 'name', nullable: false })
  name: string;

  @Column({ length: 256, name: 'detail', nullable: false })
  detail: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => SeasonEntity, (season) => season.id)
  @JoinColumn({ name: 'season_id' })
  season: SeasonEntity;
}
