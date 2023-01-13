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
import { EpisodeEntity } from './episode.entity';

@Entity('dubbing')
export class DubbingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, name: 'language', nullable: false })
  language: string;

  @Column({ length: 256, name: 'dubbing_file_path', nullable: false })
  dubbingFilePath: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => EpisodeEntity, (episode) => episode.id, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'episode_id' })
  episode: EpisodeEntity;
}
