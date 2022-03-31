import {
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.name, { message: MessageHelper.FULL_NAME_VALID })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.name, { message: MessageHelper.FULL_NAME_VALID })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: MessageHelper.PASSWORD_MIN_VALID })
  @MaxLength(30, { message: MessageHelper.PASSWORD_MAX_VALID })
  @Matches(RegExHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsString()
  photo: string;
}
