import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';
import { ToursEntity } from 'src/app/tours/tours.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amountPeople: number;

  @IsNotEmpty()
  @IsUUID()
  tour: ToursEntity;
}
