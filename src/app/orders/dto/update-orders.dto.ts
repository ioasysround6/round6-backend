import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amountPeople: number;
}
