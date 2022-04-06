import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Matches(RegExHelper.name, { message: MessageHelper.FIRST_NAME_VALID })
  firstName: string;

  @IsOptional()
  @IsString()
  @Matches(RegExHelper.name, { message: MessageHelper.LAST_NAME_VALID })
  lastName: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: MessageHelper.PASSWORD_MIN_VALID })
  @MaxLength(30, { message: MessageHelper.PASSWORD_MAX_VALID })
  @Matches(RegExHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;

  @IsOptional()
  @IsString()
  photo: string;
}
