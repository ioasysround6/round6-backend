import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ToursEntity } from '../tours/tours.entity';

@Entity({ name: 'stories' })
export class StoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'community_name', length: '255' })
  communityName: string;

  @Column()
  description: string;

  @Column()
  localization: string;

  @Column({ name: 'main_activities' })
  mainActivities: string;

  @Column()
  curiosities: string;

  @Column({ length: '255' })
  photo1: string;

  @Column({ length: '255' })
  photo2: string;

  @OneToOne(() => ToursEntity, (tour) => tour.story, { cascade: false })
  @JoinColumn({ name: 'tour_id' })
  tour: ToursEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
