import { IsNotEmpty, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  mainActivities: string;

  @IsNotEmpty()
  @IsString()
  curiosities: string;

  @IsNotEmpty()
  @IsString()
  photo: string;
}
