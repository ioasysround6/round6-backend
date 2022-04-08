import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesEntity } from './stories.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(StoriesEntity)
    private readonly storyRepository: Repository<StoriesEntity>,
  ) {}

  async seeAllStories() {
    return await createQueryBuilder(StoriesEntity, 'stories')
      .select([
        'stories.id',
        'stories.communityName',
        'stories.description',
        'stories.localization',
        'stories.mainActivities',
        'stories.curiosities',
        'stories.photo',
      ])
      .getMany();
  }

  async seeOneStory(conditions: FindConditions<StoriesEntity>) {
    try {
      await this.storyRepository.findOneOrFail(conditions);
      return await createQueryBuilder(StoriesEntity, 'stories')
        .select([
          'stories.id',
          'stories.communityName',
          'stories.description',
          'stories.localization',
          'stories.mainActivities',
          'stories.curiosities',
          'stories.photo',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createStory(data: CreateStoryDto, req: any) {
    const story = this.storyRepository.create(data);
    story.user = req.user;
    const savedStory = await this.storyRepository.save(story);
    savedStory.user = undefined;
    return savedStory;
  }

  async updateStory(id: string, data: UpdateStoryDto) {
    try {
      const story = await this.storyRepository.findOneOrFail({ id });
      this.storyRepository.merge(story, data);
      return await this.storyRepository.save(story);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
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
