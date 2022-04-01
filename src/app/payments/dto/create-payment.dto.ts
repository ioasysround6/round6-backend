import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UsersEntity } from 'src/app/users/users.entity';
import { Method } from 'src/config/enum/method.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsEnum(Method)
  method: Method;

  @IsOptional()
  @Min(1)
  @Max(12)
  installments: number;

  @IsOptional()
  @IsString()
  cardNumber: string;

  @IsOptional()
  @IsString()
  printedName: string;

  @IsOptional()
  @IsString()
  dueDate: string;

  @IsOptional()
  @IsString()
  securityCode: string;

  @IsNotEmpty()
  user: UsersEntity;
}
