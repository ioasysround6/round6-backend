import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsEntity } from './payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentRepository: Repository<PaymentsEntity>,
  ) {}

  async seePaymentMethod(conditions: FindConditions<PaymentsEntity>) {
    try {
      return await createQueryBuilder(PaymentsEntity, 'payments')
        .leftJoinAndSelect('payments.user', 'user')
        .select([
          'payments.id',
          'payments.method',
          'payments.installments',
          'payments.cardNumber',
          'payments.printedName',
          'payments.dueDate',
          'payments.securityCode',
          'user.id',
          'user.firstName',
          'user.lastName',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createPaymentMethod(data: CreatePaymentDto) {
    const payment = this.paymentRepository.create(data);
    return await this.paymentRepository.save(payment);
  }

  async updatePaymentMethod(id: string, data: UpdatePaymentDto) {
    try {
      const payment = await this.paymentRepository.findOneOrFail({ id });
      this.paymentRepository.merge(payment, data);
      return await this.paymentRepository.save(payment);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deletePaymentMethod(id: string) {
    try {
      await this.paymentRepository.findOneOrFail({ id });
      this.paymentRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
