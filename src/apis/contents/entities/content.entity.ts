import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DubbingEntity } from './dubbing.entity';
import { EpisodeEntity } from './episode.entity';
import { GenreEntity } from './genre.entity';
import { SeasonEntity } from './season.entity';
import { SubtitleEntity } from './subtitle.entity';
import { PickedContentsEntity } from '../../preference/entities/picked-contents.entity';
import { PreferenceEntity } from '../../preference/entities/preference.entity';
import { HistoryEntity } from '../../history/entities/history.entity';
import { WatchingEntity } from '../../history/entities/watching.entity';

@Entity('content')
export class ContentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, name: 'title', nullable: false })
  title: string;

  @Column({ length: 256, name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column({ type: 'text', name: 'detail', nullable: false })
  detail: string;

  @Column({ type: 'integer', name: 'age_limit', nullable: false })
  ageLimit: number;

  @Column({ type: 'integer', name: 'year', nullable: false })
  year: number;

  @Column({ length: 10, name: 'content_type', nullable: false })
  contentType: string;

  @Column({ type: 'integer', name: 'view', nullable: false })
  view: number;

  @Column({ length: 256, name: 'video_path', nullable: false })
  videoPath: string;

  @Column({ length: 20, name: 'language', nullable: false })
  language: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @OneToMany(() => DubbingEntity, (dubbing) => dubbing.id)
  dubbing: DubbingEntity[];

  @OneToMany(() => EpisodeEntity, (episode) => episode.id)
  episode: EpisodeEntity[];

  @OneToMany(() => GenreEntity, (genre) => genre.id)
  genre: GenreEntity[];

  @OneToMany(() => SeasonEntity, (season) => season.id)
  season: SeasonEntity[];

  @OneToMany(() => SubtitleEntity, (subtitle) => subtitle.id)
  subtitle: SubtitleEntity[];

  @OneToMany(() => PickedContentsEntity, (picked) => picked.id)
  pickedContents: PickedContentsEntity[];

  @OneToMany(() => PreferenceEntity, (preference) => preference.id)
  preference: PreferenceEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.id)
  history: HistoryEntity[];

  @OneToMany(() => WatchingEntity, (watching) => watching.id)
  watching: WatchingEntity[];
}
