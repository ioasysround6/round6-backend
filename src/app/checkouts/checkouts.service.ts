import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { CheckoutsEntity } from './checkouts.entity';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectRepository(CheckoutsEntity)
    private readonly checkoutRepository: Repository<CheckoutsEntity>,
    private readonly orderService: OrdersService,
  ) {}

  async seeAllCheckouts() {
    return await createQueryBuilder(CheckoutsEntity, 'checkouts')
      .leftJoinAndSelect('checkouts.order', 'order')
      .leftJoinAndSelect('order.tour', 'tour')
      .select([
        'checkouts.id',
        'checkouts.firstName',
        'checkouts.lastName',
        'checkouts.email',
        'checkouts.birthDate',
        'checkouts.cpf',
        'checkouts.createdAt',
        'checkouts.updatedAt',
        'order.id',
        'tour.id',
        'tour.tourName',
        'tour.communityName',
      ])
      .getMany();
  }

  async seeOneCheckout(conditions: FindConditions<CheckoutsEntity>) {
    try {
      await this.checkoutRepository.findOneOrFail(conditions);
      return await createQueryBuilder(CheckoutsEntity, 'checkouts')
        .leftJoinAndSelect('checkouts.order', 'order')
        .leftJoinAndSelect('order.tour', 'tour')
        .select([
          'checkouts.id',
          'checkouts.firstName',
          'checkouts.lastName',
          'checkouts.email',
          'checkouts.birthDate',
          'checkouts.cpf',
          'checkouts.createdAt',
          'checkouts.updatedAt',
          'order.id',
          'tour.id',
          'tour.tourName',
          'tour.communityName',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createCheckout(data: CreateCheckoutDto) {
    const checkout = this.checkoutRepository.create(data);
    await this.orderService.checkOrderExists(checkout.order);
    return await this.checkoutRepository.save(checkout);
  }

  async updateCheckout(id: string, data: UpdateCheckoutDto) {
    try {
      const checkout = await this.checkoutRepository.findOneOrFail({ id });
      this.checkoutRepository.merge(checkout, data);
      await this.checkoutRepository.save(checkout);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteCheckout(id: string) {
    try {
      await this.checkoutRepository.findOneOrFail({ id });
      this.checkoutRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
