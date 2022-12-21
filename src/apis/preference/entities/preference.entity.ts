import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentEntity } from '../../contents/entities/content.entity';
import { ProfileEntity } from '../../user/entities/profile.entity';

@Entity('preference')
export class PreferenceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', nullable: false, name: 'preference' })
  preference: string;

  @CreateDateColumn({ name: 'created_at', type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: Date })
  updatedAt: Date;

  @ManyToOne(() => ContentEntity, (content) => content.id, {
    createForeignKeyConstraints: false,
  })
  @Index()
  @JoinColumn({ name: 'content_id' })
  content: ContentEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    createForeignKeyConstraints: false,
  })
  @Index()
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;
}
