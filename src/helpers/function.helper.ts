import { BadRequestException, ConflictException } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from './message.helper';

export const checkDuplicate = (role: UsersEntity) => {
  if (role) {
    throw new ConflictException(MessageHelper.CONFLICT);
  }
};

export const checkDate = (date: Date) => {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const differenceTime = Math.abs(currentDate.getTime() - birthDate.getTime());
  const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
  const yearsOld = Math.floor(differenceDays / 365.23);
  console.log(yearsOld);
  if (yearsOld < 18) {
    throw new BadRequestException(MessageHelper.DATE_VALID);
  }
};
