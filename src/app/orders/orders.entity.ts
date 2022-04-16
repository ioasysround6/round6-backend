import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CheckoutsEntity } from '../checkouts/checkouts.entity';
import { PaymentsEntity } from '../payments/payments.entity';
import { ToursEntity } from '../tours/tours.entity';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'amount_people' })
  amountPeople: number;

  @Column({ name: 'total_cost' })
  totalCost: number;

  @OneToOne(() => PaymentsEntity, (payment) => payment.order)
  payment: PaymentsEntity;

  @OneToMany(() => CheckoutsEntity, (checkouts) => checkouts.order)
  checkouts: CheckoutsEntity[];

  @ManyToOne(() => UsersEntity, (user) => user.orders, { cascade: true })
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
