import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  photo: string;
}
