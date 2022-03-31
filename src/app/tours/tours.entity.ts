import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from '../orders/orders.entity';

@Entity({ name: 'tours' })
export class ToursEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: '255' })
  name: string;

  @Column({ name: 'long_description' })
  longDescription: string;

  @Column({ name: 'short_description' })
  shortDescription: string;

  @Column({ length: '255' })
  accommodation: string;

  @Column({ length: '255' })
  activity: string;

  @Column({ length: '100' })
  date: string;

  @Column({ length: '255' })
  hint: string;

  @Column()
  price: number;

  @Column({ length: '255' })
  photo: string;

  @OneToMany(() => OrdersEntity, (orders) => orders.tour)
  orders: OrdersEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
