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
import { DiaresEntity } from '../diares/diares.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'comments' })
export class CommentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => UsersEntity, (user) => user.comments, { cascade: false })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => DiaresEntity, (diary) => diary.comments, { cascade: true })
  @JoinColumn({ name: 'diary_id' })
  diary: DiaresEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
