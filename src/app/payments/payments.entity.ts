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
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'payments' })
export class PaymentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Method })
  method: Method;

  @Column({ nullable: true })
  installments: number;

  @Column({ name: 'card_number', length: '255', nullable: true })
  cardNumber: string;

  @Column({ name: 'printed_name', length: '255', nullable: true })
  printedName: string;

  @Column({ name: 'due_date', length: '255', nullable: true })
  dueDate: string;

  @Column({ name: 'security_code', length: '255', nullable: true })
  securityCode: string;

  @OneToOne(() => UsersEntity, (user) => user.payment)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
