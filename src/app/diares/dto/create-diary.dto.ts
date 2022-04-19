import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  photo: string;
}
