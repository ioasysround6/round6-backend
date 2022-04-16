import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursModule } from '../tours/tours.module';
import { StoriesController } from './stories.controller';
import { StoriesEntity } from './stories.entity';
import { StoriesService } from './stories.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoriesEntity]), ToursModule],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
