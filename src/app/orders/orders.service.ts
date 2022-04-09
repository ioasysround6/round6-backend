import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkOrder, controlVacancies } from 'src/helpers/function.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { ToursService } from '../tours/tours.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
    private readonly tourService: ToursService,
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
    const order = this.orderRepository.create(data);
    order.user = req.user.id;
    const tour = await this.tourService.checkTourExists(order.tour);
    controlVacancies(tour.vacancies, order.amountPeople);
    const savedOrder = await this.orderRepository.save(order);
    savedOrder.user = undefined;
    return savedOrder;
  }

  async updateOrder(
    conditions: FindConditions<OrdersEntity>,
    data: UpdateOrderDto,
  ) {
    const order = await createQueryBuilder(OrdersEntity, 'orders')
      .leftJoinAndSelect('orders.tour', 'tour')
      .select(['orders.id', 'orders.amountPeople', 'tour.id'])
      .where(conditions)
      .getOne();
    checkOrder(order);
    const tour = await this.tourService.seeOneTour(order.tour);
    const oldAmount = order.amountPeople;
    this.orderRepository.merge(order, data);
    const newAmount = order.amountPeople;
    const requestedVacancies = newAmount - oldAmount;
    controlVacancies(tour.vacancies, requestedVacancies);
    await this.orderRepository.save(order);
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
