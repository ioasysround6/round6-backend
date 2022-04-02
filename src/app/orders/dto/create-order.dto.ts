import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ToursEntity } from 'src/app/tours/tours.entity';
import { UsersEntity } from 'src/app/users/users.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amountPeople: number;

  @IsNotEmpty()
  user: UsersEntity;

  @IsNotEmpty()
  tour: ToursEntity;
}
