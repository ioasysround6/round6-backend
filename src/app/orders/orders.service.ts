import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
      await this.orderRepository.findOneOrFail(conditions);
      return await createQueryBuilder(OrdersEntity, 'orders')
        .leftJoinAndSelect('orders.tour', 'tour')
        .leftJoinAndSelect('orders.user', 'user')
        .select([
          'orders.id',
          'orders.amountPeople',
          'tour.id',
          'tour.communityName',
          'tour.description',
          'tour.accommodation',
          'tour.activities',
          'tour.travelDate',
          'tour.hint',
          'tour.price',
          'tour.vacancies',
          'tour.photo1',
          'tour.photo2',
          'tour.photo3',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email',
          'user.birthDate',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createOrder(data: CreateOrderDto, req: any) {
    try {
      const order = this.orderRepository.create(data);
      order.user = req.user.id;
      const savedOrder = await this.orderRepository.save(order);
      savedOrder.user = undefined;
      return savedOrder;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async updateOrder(id: string, data: UpdateOrderDto) {
    try {
      const order = await this.orderRepository.findOneOrFail({ id });
      this.orderRepository.merge(order, data);
      return await this.orderRepository.save(order);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.orderRepository.findOneOrFail({ id });
      this.orderRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
