import { dataEncryption } from '../../helpers/crypto.helper';
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
import { OrdersEntity } from '../orders/orders.entity';

@Entity({ name: 'checkouts' })
export class CheckoutsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: '255' })
  firstName: string;

  @Column({ name: 'last_name', length: '255' })
  lastName: string;

  @Column({ length: '255' })
  email: string;

  @Column({ name: 'birth_date' })
  birthDate: Date;

  @Column({ length: '255', transformer: dataEncryption })
  cpf: string;

  @ManyToOne(() => OrdersEntity, (order) => order.checkouts, { cascade: true })
  @JoinColumn({ name: 'order_id' })
  order: OrdersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
