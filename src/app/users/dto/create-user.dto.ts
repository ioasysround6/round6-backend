import {
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(RegExHelper.name, { message: MessageHelper.FULL_NAME_VALID })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: MessageHelper.PASSWORD_MIN_VALID })
  @MaxLength(30, { message: MessageHelper.PASSWORD_MAX_VALID })
  @Matches(RegExHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;

  @IsNotEmpty()
  @Matches(RegExHelper.cpf, { message: MessageHelper.CPF_VALID })
  cpf: string;

  @IsNotEmpty()
  @Matches(RegExHelper.telephone, { message: MessageHelper.TELEPHONE_VALID })
  telephone: string;

  @IsOptional()
  gender: string;
}
