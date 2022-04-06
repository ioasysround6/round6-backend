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

  @Column({ name: 'community_name', length: '255' })
  communityName: string;

  @Column()
  description: string;

  @Column()
  accommodation: string;

  @Column()
  activities: string;

  @Column({ name: 'travel_date' })
  travelDate: string;

  @Column()
  hint: string;

  @Column()
  price: number;

  @Column()
  vacancies: number;

  @Column({ length: '255' })
  photo1: string;

  @Column({ length: '255', nullable: true })
  photo2: string;

  @Column({ length: '255', nullable: true })
  photo3: string;

  @OneToMany(() => OrdersEntity, (orders) => orders.tour)
  orders: OrdersEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
