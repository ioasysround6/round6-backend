import { IsNotEmpty, IsNumber } from 'class-validator';
import { ToursEntity } from 'src/app/tours/tours.entity';
import { UsersEntity } from 'src/app/users/users.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  amountPeople: number;

  @IsNotEmpty()
  user: UsersEntity;

  @IsNotEmpty()
  tour: ToursEntity;
}
