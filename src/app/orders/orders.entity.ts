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
import { ToursEntity } from '../tours/tours.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount_people' })
  amountPeople: number;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => ToursEntity, (tour) => tour.orders)
  @JoinColumn({ name: 'tour_id' })
  tour: ToursEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
