import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  activities: string;

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

  @IsNotEmpty()
  @IsString()
  photo1: string;

  @IsOptional()
  @IsString()
  photo2: string;

  @IsOptional()
  @IsString()
  photo3: string;
}
