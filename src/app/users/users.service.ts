import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { Role } from 'src/config/enum/role.enum';
import { checkDuplicate } from 'src/helpers/function.helper';
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
      //.leftJoinAndSelect('customers.orders', 'orders')
      //.leftJoinAndSelect('orders.vehicles', 'vehicles')
      .select([
        'users.id',
        'users.firstName',
        'users.lastName',
        'users.email',
        'users.photo',
        'users.role',
        /* 'orders.id',
        'orders.payment',
        'orders.totalQuantity',
        'vehicles.id',
        'vehicles.brand',
        'vehicles.model', */
      ])
      .getMany();
  }

  async getProfile(conditions: FindConditions<UsersEntity>) {
    try {
      return await createQueryBuilder(UsersEntity, 'users')
        //.leftJoinAndSelect('users.orders', 'orders')
        //.leftJoinAndSelect('orders.vehicles', 'vehicles')
        .select([
          'users.id',
          'users.firstName',
          'users.lastName',
          'users.email',
          'users.photo',
          'users.role',
          /* 'orders.id',
          'orders.payment',
          'orders.totalQuantity',
          'vehicles.id',
          'vehicles.brand',
          'vehicles.model', */
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
      throw new NotFoundException(error.message);
    }
  }

  async createUserAccount(data: CreateUserDto) {
    const { email } = data;
    const verifyUser = await this.userRepository.findOne({ email });
    checkDuplicate(verifyUser);
    const user = this.userRepository.create(data);
    user.password = hashSync(user.password, 10);
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
    const savedAdmin = await this.userRepository.save(admin);
    savedAdmin.password = undefined;
    return savedAdmin;
  }

  async updateAccount(id: string, data: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ id });
      const userOldPassword = user.password;
      this.userRepository.merge(user, data);
      if (userOldPassword !== user.password) {
        user.password = hashSync(user.password, 10);
      }
      const updatedUser = await this.userRepository.save(user);
      updatedUser.password = undefined;
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async recoverPassword(id: string, data: UpdatePasswordDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ id });
      const password = hashSync(data.password, 10);
      data = {
        ...data,
        password,
      };
      this.userRepository.merge(user, data);
      const updatedPassword = await this.userRepository.save(user);
      updatedPassword.password = undefined;
      return updatedPassword;
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteAccount(id: string) {
    try {
      await this.userRepository.findOneOrFail({ id });
      this.userRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
