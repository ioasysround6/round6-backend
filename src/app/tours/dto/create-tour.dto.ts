import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  longDescription: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  accommodation: string;

  @IsNotEmpty()
  @IsString()
  activity: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  hint: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  photo: string;
}
