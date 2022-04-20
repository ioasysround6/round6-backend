import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { Method } from 'src/config/enum/method.enum';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class UpdatePaymentDto {
  @IsOptional()
  @IsEnum(Method, { message: MessageHelper.METHOD_VALID })
  method: Method;

  @IsOptional()
  @IsInt()
  @Min(1)
  installments: number;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.cardNumber, { message: MessageHelper.CARD_NUMBER_VALID })
  cardNumber: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.printedName, {
    message: MessageHelper.PRINTED_NAME_VALID,
  })
  printedName: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.dueDate, { message: MessageHelper.DUE_DATE_VALID })
  dueDate: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.securityCode, {
    message: MessageHelper.SECURITY_CODE_VALID,
  })
  securityCode: string;
}
