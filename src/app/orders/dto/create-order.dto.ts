import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ToursEntity } from 'src/app/tours/tours.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amountPeople: number;

  @IsNotEmpty()
  @IsUUID()
  tour: ToursEntity;
}
