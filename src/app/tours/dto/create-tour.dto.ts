import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTourDto {
  @IsNotEmpty()
  @IsString()
  communityName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  accommodation: string;

  @IsNotEmpty()
  @IsString()
  activity: string;

  @IsNotEmpty()
  @IsString()
  travelDate: string;

  @IsNotEmpty()
  @IsString()
  hint: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  vacancies: number;

  @IsString()
  photo1: string;

  @IsString()
  photo2: string;

  @IsString()
  photo3: string;
}
