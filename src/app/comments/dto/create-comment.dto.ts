import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { DiaresEntity } from 'src/app/diares/diares.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  diary: DiaresEntity;
}
