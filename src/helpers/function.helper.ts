import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OrdersEntity } from 'src/app/orders/orders.entity';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from './message.helper';

export const checkDuplicate = (duplicate: UsersEntity) => {
  if (duplicate) {
    throw new ConflictException(MessageHelper.CONFLICT);
  }
};

export const checkDate = (date: Date) => {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const differenceTime = Math.abs(currentDate.getTime() - birthDate.getTime());
  const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
  const yearsOld = Math.floor(differenceDays / 365.23);

  if (yearsOld < 18) {
    throw new BadRequestException(MessageHelper.DATE_VALID);
  }
};

export const controlVacancies = (
  numberVacancies: number,
  requestedVacancies: number,
) => {
  if (numberVacancies < requestedVacancies) {
    throw new UnprocessableEntityException(MessageHelper.UNAVAILABLE_VACANCIES);
  } else if (requestedVacancies === 0) {
    throw new UnprocessableEntityException(MessageHelper.IMPOSSIBLE_UPDATE);
  }
};

export const checkOrder = (order: OrdersEntity) => {
  if (!order) {
    throw new NotFoundException(MessageHelper.NOT_FOUND);
  }
};

export const checkUserExists = (user: UsersEntity) => {
  if (!user) {
    throw new NotFoundException(MessageHelper.NOT_FOUND);
  }
};
