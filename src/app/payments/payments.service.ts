import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Method } from 'src/config/enum/method.enum';
import { checkPaymentsExists, divideValues } from 'src/helpers/function.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsEntity } from './payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentRepository: Repository<PaymentsEntity>,
    private readonly orderService: OrdersService,
  ) {}

  async seeAllPayments() {
    return await createQueryBuilder(PaymentsEntity, 'payments')
      .leftJoinAndSelect('payments.order', 'order')
      .leftJoinAndSelect('order.user', 'user')
      .select([
        'payments.id',
        'payments.method',
        'payments.createdAt',
        'payments.updatedAt',
        'order.id',
        'user.id',
        'user.firstName',
        'user.lastName',
      ])
      .getMany();
  }

  async seeOnePayment(conditions: FindConditions<PaymentsEntity>) {
    try {
      await this.paymentRepository.findOneOrFail(conditions);
      const payment = await createQueryBuilder(PaymentsEntity, 'payments')
        .select([
          'payments.id',
          'payments.method',
          'payments.installments',
          'payments.installmentValue',
          'payments.createdAt',
          'payments.updatedAt',
        ])
        .where(conditions)
        .getOne();

      if (
        payment.installments === null ||
        payment.cardNumber === null ||
        payment.printedName === null ||
        payment.dueDate === null ||
        payment.securityCode === null
      ) {
        (payment.installments = undefined),
          (payment.installmentValue = undefined),
          (payment.cardNumber = undefined),
          (payment.printedName = undefined),
          (payment.dueDate = undefined),
          (payment.securityCode = undefined);
      }
      return payment;
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createPayment(data: CreatePaymentDto) {
    const payment = this.paymentRepository.create(data);
    const order = await this.orderService.checkOrderExists(payment.order);
    if (payment.method === Method.CreditCard) {
      if (
        payment.installments === undefined ||
        payment.cardNumber === undefined ||
        payment.printedName === undefined ||
        payment.dueDate === undefined ||
        payment.securityCode === undefined
      ) {
        throw new BadRequestException(MessageHelper.CREDIT_CARD_INVALID);
      } else {
        payment.installmentValue = divideValues(
          order.totalCost,
          payment.installments,
        );
      }
    } else {
      (payment.installments = null),
        (payment.installmentValue = null),
        (payment.cardNumber = null),
        (payment.printedName = null),
        (payment.dueDate = null),
        (payment.securityCode = null);
    }
    const savedPayment = await this.paymentRepository.save(payment);
    savedPayment.cardNumber = undefined;
    savedPayment.printedName = undefined;
    savedPayment.dueDate = undefined;
    savedPayment.securityCode = undefined;
    return savedPayment;
  }

  async updatePayment(
    conditions: FindConditions<PaymentsEntity>,
    data: UpdatePaymentDto,
  ) {
    const payment = await createQueryBuilder(PaymentsEntity, 'payments')
      .leftJoinAndSelect('payments.order', 'order')
      .select(['payments.id', 'order.id'])
      .where(conditions)
      .getOne();
    checkPaymentsExists(payment);
    const updatedPayment = this.paymentRepository.merge(payment, data);
    const order = await this.orderService.seeOneOrder(payment.order);
    if (updatedPayment.method === Method.CreditCard) {
      if (
        updatedPayment.installments === undefined ||
        updatedPayment.cardNumber === undefined ||
        updatedPayment.printedName === undefined ||
        updatedPayment.dueDate === undefined ||
        updatedPayment.securityCode === undefined
      ) {
        throw new BadRequestException(MessageHelper.CREDIT_CARD_INVALID);
      } else {
        payment.installmentValue = divideValues(
          order.totalCost,
          payment.installments,
        );
      }
    } else {
      (updatedPayment.installments = null),
        (payment.installmentValue = null),
        (updatedPayment.cardNumber = null),
        (updatedPayment.printedName = null),
        (updatedPayment.dueDate = null),
        (updatedPayment.securityCode = null);
    }
    await this.paymentRepository.save(updatedPayment);
  }

  async deletePayment(id: string) {
    try {
      await this.paymentRepository.findOneOrFail({ id });
      this.paymentRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
