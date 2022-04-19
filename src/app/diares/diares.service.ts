import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { DiaresEntity } from './diares.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@Injectable()
export class DiaresService {
  constructor(
    @InjectRepository(DiaresEntity)
    private readonly diaryRepository: Repository<DiaresEntity>,
    private readonly userService: UsersService,
  ) {}

  async seeAllDiaries() {
    return await createQueryBuilder(DiaresEntity, 'diares')
      .leftJoinAndSelect('diares.user', 'users')
      .leftJoinAndSelect('diares.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .select([
        'diares.id',
        'diares.title',
        'diares.content',
        'diares.photo',
        'diares.createdAt',
        'diares.updatedAt',
        'users.id',
        'users.firstName',
        'users.lastName',
        'comments.id',
        'comments.content',
        'comments.createdAt',
        'comments.updatedAt',
        'user.id',
        'user.firstName',
        'user.lastName',
      ])
      .getMany();
  }

  async seeOneDiary(conditions: FindConditions<DiaresEntity>) {
    try {
      await this.diaryRepository.findOneOrFail(conditions);
      return await createQueryBuilder(DiaresEntity, 'diares')
        .leftJoinAndSelect('diares.user', 'users')
        .leftJoinAndSelect('diares.comments', 'comments')
        .leftJoinAndSelect('comments.user', 'user')
        .select([
          'diares.id',
          'diares.title',
          'diares.content',
          'diares.photo',
          'diares.createdAt',
          'diares.updatedAt',
          'users.id',
          'users.firstName',
          'users.lastName',
          'comments.id',
          'comments.content',
          'comments.createdAt',
          'comments.updatedAt',
          'user.id',
          'user.firstName',
          'user.lastName',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async checkDiaryExists(conditions: FindConditions<DiaresEntity>) {
    try {
      return await this.diaryRepository.findOneOrFail(conditions);
    } catch (error) {
      throw new BadRequestException(MessageHelper.UNIDENTIFIED_DIARY);
    }
  }

  async createDiary(data: CreateDiaryDto, req: any) {
    const diary = this.diaryRepository.create(data);
    await this.userService.checkUser(req.user);
    diary.user = req.user;
    const savedDiary = await this.diaryRepository.save(diary);
    savedDiary.user = undefined;
    return savedDiary;
  }

  async updateDiary(id: string, data: UpdateDiaryDto) {
    try {
      const diary = await this.diaryRepository.findOneOrFail({ id });
      this.diaryRepository.merge(diary, data);
      await this.diaryRepository.save(diary);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteDiary(id: string) {
    try {
      await this.diaryRepository.findOneOrFail({ id });
      this.diaryRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
