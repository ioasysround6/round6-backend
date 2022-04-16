import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'tokens' })
export class TokensEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '255' })
  hash: string;

  @OneToOne(() => UsersEntity, (user) => user.token, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
