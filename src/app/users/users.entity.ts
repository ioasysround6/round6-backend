import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../config/enum/role.enum';
import { OrdersEntity } from '../orders/orders.entity';
import { StoriesEntity } from '../stories/stories.entity';

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
  birthDate: string;

  @Column({ length: '255' })
  photo: string;

  @Column({ type: 'enum', enum: Role, default: Role.Tourist })
  role: Role;

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];

  @OneToMany(() => StoriesEntity, (stories) => stories.user)
  stories: StoriesEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
