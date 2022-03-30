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

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', length: '255' })
  firstName: string;

  @Column({ name: 'last_name', length: '255' })
  lastName: string;

  @Column({ length: '255', unique: true })
  email: string;

  @Column({ length: '255' })
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'enum', enum: Role, default: Role.Tourist })
  role: Role;

  @OneToMany(() => OrdersEntity, (orders) => orders.user)
  orders: OrdersEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
