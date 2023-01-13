import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EpisodeEntity } from './episode.entity';
import { GenreEntity } from './genre.entity';
import { SeasonEntity } from './season.entity';
import { PickedContentsEntity } from '../../preference/entities/picked-contents.entity';
import { PreferenceEntity } from '../../preference/entities/preference.entity';
import { HistoryEntity } from '../../history/entities/history.entity';
import { WatchingEntity } from '../../history/entities/watching.entity';

@Entity('content')
export class ContentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {})
  id: string;

  @Column({ length: 30, name: 'title', nullable: false })
  title: string;

  @Column({ length: 256, name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column({ type: 'text', name: 'detail', nullable: false })
  detail: string;

  @Column({ name: 'age_limit', nullable: false })
  ageLimit: string;

  @Column({ name: 'year', nullable: false })
  year: string;

  @Column({ length: 10, name: 'content_type', nullable: false })
  contentType: string;

  @Column({ type: 'integer', name: 'view', nullable: false, default: 0 })
  view: number;

  @Column({ length: 20, name: 'language', nullable: false })
  language: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @OneToMany(() => EpisodeEntity, (episode) => episode.id)
  episode: EpisodeEntity[];

  @OneToMany(() => GenreEntity, (genre) => genre.id)
  genre: GenreEntity[];

  @OneToMany(() => SeasonEntity, (season) => season.id)
  season: SeasonEntity[];

  @OneToMany(() => PickedContentsEntity, (picked) => picked.id)
  pickedContents: PickedContentsEntity[];

  @OneToMany(() => PreferenceEntity, (preference) => preference.id)
  preference: PreferenceEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.id)
  history: HistoryEntity[];

  @OneToMany(() => WatchingEntity, (watching) => watching.id)
  watching: WatchingEntity[];
}
