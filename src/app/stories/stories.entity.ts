import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'stories' })
export class StoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'community_name', length: '255' })
  communityName: string;

  @Column()
  description: string;

  @Column({ length: '255' })
  localization: string;

  @Column({ name: 'main_activities' })
  mainActivities: string;

  @Column()
  curiosities: string;

  @Column()
  photo: string;

  @ManyToOne(() => UsersEntity, (user) => user.stories)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
