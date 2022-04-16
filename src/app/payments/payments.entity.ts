import { Method } from '../../config/enum/method.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrdersEntity } from '../orders/orders.entity';
import { dataEncryption } from '../../helpers/crypto.helper';

@Entity({ name: 'payments' })
export class PaymentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  method: Method;

  @Column({ nullable: true })
  installments: number;

  @Column({ name: 'installment_value' })
  installmentValue: number;

  @Column({ name: 'card_number', nullable: true, transformer: dataEncryption })
  cardNumber: string;

  @Column({ name: 'printed_name', nullable: true, transformer: dataEncryption })
  printedName: string;

  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @Column({
    name: 'security_code',
    nullable: true,
    transformer: dataEncryption,
  })
  securityCode: string;

  @OneToOne(() => OrdersEntity, (order) => order.payment, { cascade: true })
  @JoinColumn({ name: 'order_id' })
  order: OrdersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
