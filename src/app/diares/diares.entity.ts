import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentsEntity } from '../comments/comments.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'diares' })
export class DiaresEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '255' })
  title: string;

  @Column()
  content: string;

  @Column({ length: '255', nullable: true })
  photo: string;

  @OneToMany(() => CommentsEntity, (comments) => comments.diary)
  comments: CommentsEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.diares, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
