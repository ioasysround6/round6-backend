import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { MessageHelper } from './message.helper';

export const checkDuplicate = (role: UsersEntity) => {
  if (role) {
    throw new BadRequestException(MessageHelper.INFORMATIONS_INVALID);
  }
};

export const checkTokenId = (req: any, user: UsersEntity) => {
  if (req.id !== user.id) {
    throw new ForbiddenException(MessageHelper.FORBIDDEN);
  }
};
