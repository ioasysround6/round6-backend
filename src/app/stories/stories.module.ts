import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoriesController } from './stories.controller';
import { StoriesEntity } from './stories.entity';
import { StoriesService } from './stories.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoriesEntity])],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
