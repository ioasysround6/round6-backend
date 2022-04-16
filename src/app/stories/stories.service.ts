import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { checkStoriesExists } from 'src/helpers/function.helper';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { ToursService } from '../tours/tours.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesEntity } from './stories.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(StoriesEntity)
    private readonly storyRepository: Repository<StoriesEntity>,
    private readonly tourService: ToursService,
  ) {}

  async seeAllStories() {
    return await createQueryBuilder(StoriesEntity, 'stories')
      .leftJoinAndSelect('stories.tour', 'tour')
      .select([
        'stories.id',
        'stories.communityName',
        'stories.description',
        'stories.localization',
        'stories.mainActivities',
        'stories.curiosities',
        'stories.photo1',
        'stories.photo2',
        'stories.createdAt',
        'stories.updatedAt',
        'tour.id',
        'tour.tourName',
      ])
      .getMany();
  }

  async seeOneStory(conditions: FindConditions<StoriesEntity>) {
    try {
      await this.storyRepository.findOneOrFail(conditions);
      return await createQueryBuilder(StoriesEntity, 'stories')
        .leftJoinAndSelect('stories.tour', 'tour')
        .select([
          'stories.id',
          'stories.communityName',
          'stories.description',
          'stories.localization',
          'stories.mainActivities',
          'stories.curiosities',
          'stories.photo1',
          'stories.photo2',
          'stories.createdAt',
          'stories.updatedAt',
          'tour.id',
          'tour.tourName',
          'tour.communityName',
          'tour.description',
          'tour.accommodation',
          'tour.activities',
          'tour.travelDate',
          'tour.hint',
          'tour.price',
          'tour.vacancies',
          'tour.photo1',
          'tour.photo2',
          'tour.photo3',
          'tour.createdAt',
          'tour.updatedAt',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createStory(data: CreateStoryDto) {
    const story = this.storyRepository.create(data);
    await this.tourService.checkTourExists(story.tour);
    return await this.storyRepository.save(story);
  }

  async updateStory(
    conditions: FindConditions<StoriesEntity>,
    data: UpdateStoryDto,
  ) {
    const story = await createQueryBuilder(StoriesEntity, 'stories')
      .select(['stories.id'])
      .where(conditions)
      .getOne();
    checkStoriesExists(story);
    this.storyRepository.merge(story, data);
    await this.tourService.checkTourExists(story.tour);
    await this.storyRepository.save(story);
  }

  async deleteStory(id: string) {
    try {
      await this.storyRepository.findOneOrFail({ id });
      this.storyRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
