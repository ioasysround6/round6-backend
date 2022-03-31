import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
  ) {}

  async seeOneOrder(conditions: FindConditions<OrdersEntity>) {
    try {
      return await createQueryBuilder(OrdersEntity, 'orders')
        .leftJoinAndSelect('orders.tour', 'tour')
        //.leftJoinAndSelect('tour.categories', 'categories')
        .select([
          'orders.id',
          'orders.quantity',
          'tour.id',
          'tour.name',
          'tour.accommodation',
          'tours.activity',
          'tours.date',
          'tours.hint',
          'tour.price',
          'tour.photo',
          //'categories.name',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createOrder(data: CreateOrderDto) {
    const order = this.orderRepository.create(data);
    return await this.orderRepository.save(order);
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOneOrFail({ id });
      this.orderRepository.merge(order, data);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.orderRepository.findOneOrFail({ id });
      this.orderRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
