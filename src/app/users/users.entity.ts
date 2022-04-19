import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../config/enum/role.enum';
import { CommentsEntity } from '../comments/comments.entity';
import { DiaresEntity } from '../diares/diares.entity';
import { OrdersEntity } from '../orders/orders.entity';
import { TokensEntity } from '../tokens/tokens.entity';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: '255' })
  firstName: string;

  @Column({ name: 'last_name', length: '255' })
  lastName: string;

  @Column({ length: '255', unique: true })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ length: '255' })
  photo: string;

  @Column({ type: 'enum', enum: Role, default: Role.Tourist })
  role: Role;

  @OneToOne(() => TokensEntity, (token) => token.user)
  token: TokensEntity;

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];

  @OneToMany(() => DiaresEntity, (diares) => diares.user)
  diares: DiaresEntity[];

  @OneToMany(() => CommentsEntity, (comments) => comments.user)
  comments: CommentsEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
