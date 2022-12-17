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
import { ContentEntity } from './content.entity';
import { EpisodeEntity } from './episode.entity';

@Entity('season')
export class SeasonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', name: 'season_num', nullable: false })
  seasonNum: number;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => ContentEntity, (content) => content.id, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'content_id' })
  content: ContentEntity;

  @OneToMany(() => EpisodeEntity, (episode) => episode.id)
  episode: EpisodeEntity[];
}
