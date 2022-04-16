import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  checkOrder,
  controlVacancies,
  multiplyValues,
  subtractValues,
} from 'src/helpers/function.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { ToursService } from '../tours/tours.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>,
    private readonly tourService: ToursService,
    private readonly userService: UsersService,
  ) {}

  async seeAllOrders() {
    return await createQueryBuilder(OrdersEntity, 'orders')
      .leftJoinAndSelect('orders.user', 'user')
      .select([
        'orders.id',
        'orders.createdAt',
        'orders.updatedAt',
        'user.id',
        'user.firstName',
        'user.lastName',
      ])
      .getMany();
  }

  async seeOneOrder(conditions: FindConditions<OrdersEntity>) {
    try {
      await this.orderRepository.findOneOrFail(conditions);
      return await createQueryBuilder(OrdersEntity, 'orders')
        .leftJoinAndSelect('orders.tour', 'tour')
        .leftJoinAndSelect('orders.user', 'user')
        .leftJoinAndSelect('orders.payment', 'payment')
        .leftJoinAndSelect('orders.checkouts', 'checkouts')
        .select([
          'orders.id',
          'orders.amountPeople',
          'orders.totalCost',
          'orders.createdAt',
          'orders.updatedAt',
          'tour.id',
          'tour.tourName',
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
          'payment.id',
          'payment.method',
          'checkouts.firstName',
          'checkouts.lastName',
          'checkouts.email',
          'checkouts.birthDate',
          'checkouts.cpf',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async checkOrderExists(conditions: FindConditions<OrdersEntity>) {
    try {
      return await this.orderRepository.findOneOrFail(conditions);
    } catch (error) {
      throw new BadRequestException(MessageHelper.UNIDENTIFIED_ORDER);
    }
  }

  async createOrder(data: CreateOrderDto, req: any) {
    const order = this.orderRepository.create(data);
    await this.userService.checkUser(req.user.id);
    order.user = req.user.id;
    const tour = await this.tourService.checkTourExists(order.tour);
    controlVacancies(tour.vacancies, order.amountPeople);
    order.totalCost = multiplyValues(tour.price, order.amountPeople);
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
    const requestedVacancies = subtractValues(newAmount, oldAmount);
    controlVacancies(tour.vacancies, requestedVacancies);
    order.totalCost = multiplyValues(tour.price, newAmount);
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
