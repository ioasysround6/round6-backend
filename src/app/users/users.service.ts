import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Role } from 'src/config/enum/role.enum';
import {
  checkDate,
  checkDuplicate,
  checkUserExists,
} from 'src/helpers/function.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import {
  createQueryBuilder,
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async findAllUsers() {
    return await createQueryBuilder(UsersEntity, 'users')
      .select(['users.id', 'users.firstName', 'users.lastName', 'users.photo'])
      .getMany();
  }

  async getProfile(conditions: FindConditions<UsersEntity>) {
    try {
      await this.userRepository.findOneOrFail(conditions);
      return await createQueryBuilder(UsersEntity, 'users')
        .leftJoinAndSelect('users.orders', 'orders')
        .leftJoinAndSelect('orders.tour', 'tour')
        .leftJoinAndSelect('orders.payment', 'payment')
        .leftJoinAndSelect('orders.checkouts', 'checkouts')
        .select([
          'users.id',
          'users.firstName',
          'users.lastName',
          'users.email',
          'users.birthDate',
          'users.photo',
          'users.role',
          'users.createdAt',
          'users.updatedAt',
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
          'payment.id',
          'payment.method',
          'checkouts.id',
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

  async checkUser(
    conditions: FindConditions<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new UnauthorizedException(MessageHelper.UNIDENTIFIED_USER);
    }
  }

  async createUserAccount(data: CreateUserDto) {
    const { email } = data;
    const verifyUser = await this.userRepository.findOne({ email });
    checkDuplicate(verifyUser);
    const user = this.userRepository.create(data);
    user.password = hashSync(user.password, 10);
    checkDate(user.birthDate);
    const savedUser = await this.userRepository.save(user);
    savedUser.password = undefined;
    return savedUser;
  }

  async createAdminAccount(data: CreateUserDto) {
    const { email } = data;
    const verifyAdmin = await this.userRepository.findOne({ email });
    checkDuplicate(verifyAdmin);
    const admin = this.userRepository.create(data);
    admin.password = hashSync(admin.password, 10);
    admin.role = Role.Admin;
    checkDate(admin.birthDate);
    const savedAdmin = await this.userRepository.save(admin);
    savedAdmin.password = undefined;
    return savedAdmin;
  }

  async updateAccount(
    conditions: FindConditions<UsersEntity>,
    data: UpdateUserDto,
  ) {
    const user = await createQueryBuilder(UsersEntity, 'users')
      .select(['users.id', 'users.password'])
      .where(conditions)
      .getOne();
    checkUserExists(user);
    const { email } = data;
    const verifyUser = await this.userRepository.findOne({ email });
    checkDuplicate(verifyUser);
    const userOldPassword = user.password;
    this.userRepository.merge(user, data);
    if (userOldPassword !== user.password) {
      user.password = hashSync(user.password, 10);
    }
    await this.userRepository.save(user);
  }

  async recoverPassword(
    conditions: FindConditions<UsersEntity>,
    data: UpdatePasswordDto,
  ) {
    try {
      const user = await this.userRepository.findOneOrFail(conditions);
      const password = hashSync(data.password, 10);
      data = {
        ...data,
        password,
      };
      this.userRepository.merge(user, data);
      await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteAccount(conditions: FindConditions<UsersEntity>) {
    try {
      await this.userRepository.findOneOrFail(conditions);
      this.userRepository.delete(conditions);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
