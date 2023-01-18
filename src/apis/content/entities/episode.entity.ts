import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SeasonEntity } from './season.entity';
import { WatchingEntity } from '../../history/entities/watching.entity';
import { SubtitleEntity } from './subtitle.entity';
import { DubbingEntity } from './dubbing.entity';

@Entity('episode')
export class EpisodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256, name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column({ length: 256, name: 'video_path', nullable: false })
  videoFilePath: string;

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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'season_id' })
  season: SeasonEntity;

  @OneToOne(() => SubtitleEntity, (subtitle) => subtitle.episode, {
    cascade: true,
  })
  subtitle: SubtitleEntity[];

  @OneToOne(() => DubbingEntity, (dubbing) => dubbing.episode, {
    cascade: true,
  })
  dubbing: DubbingEntity[];

  @OneToOne(() => WatchingEntity, (watching) => watching.episode, {
    cascade: true,
  })
  watching: WatchingEntity[];
}
