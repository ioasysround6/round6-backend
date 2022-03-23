import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @MinLength(8, { message: MessageHelper.PASSWORD_MIN_VALID })
  @MaxLength(30, { message: MessageHelper.PASSWORD_MAX_VALID })
  @Matches(RegExHelper.password, { message: MessageHelper.PASSWORD_VALID })
  password: string;
}
