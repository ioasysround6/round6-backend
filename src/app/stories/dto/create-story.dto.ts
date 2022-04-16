import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ToursEntity } from 'src/app/tours/tours.entity';

export class CreateStoryDto {
  @IsNotEmpty()
  @IsString()
  communityName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  localization: string;

  @IsOptional()
  @IsString()
  mainActivities: string;

  @IsOptional()
  @IsString()
  curiosities: string;

  @IsNotEmpty()
  @IsString()
  photo1: string;

  @IsNotEmpty()
  @IsString()
  photo2: string;

  @IsNotEmpty()
  @IsUUID()
  tour: ToursEntity;
}
