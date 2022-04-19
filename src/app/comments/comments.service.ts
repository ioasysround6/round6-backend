import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { DiaresService } from '../diares/diares.service';
import { UsersService } from '../users/users.service';
import { CommentsEntity } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,
    private readonly diaryService: DiaresService,
    private readonly userService: UsersService,
  ) {}

  async seeAllComments() {
    return await createQueryBuilder(CommentsEntity, 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.diary', 'diary')
      .select([
        'comments.id',
        'comments.content',
        'comments.createdAt',
        'comments.updatedAt',
        'user.id',
        'user.firstName',
        'user.lastName',
        'diary.id',
        'diary.title',
      ])
      .getMany();
  }

  async seeOneComment(conditions: FindConditions<CommentsEntity>) {
    try {
      await this.commentRepository.findOneOrFail(conditions);
      return await createQueryBuilder(CommentsEntity, 'comments')
        .leftJoinAndSelect('comments.user', 'user')
        .leftJoinAndSelect('comments.diary', 'diary')
        .select([
          'comments.id',
          'comments.content',
          'comments.createdAt',
          'comments.updatedAt',
          'user.id',
          'user.firstName',
          'user.lastName',
          'diary.id',
          'diary.title',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async createComment(data: CreateCommentDto, req: any) {
    const comment = this.commentRepository.create(data);
    await this.diaryService.checkDiaryExists(comment.diary);
    await this.userService.checkUser(req.user);
    comment.user = req.user;
    const savedComment = await this.commentRepository.save(comment);
    savedComment.user = undefined;
    return savedComment;
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    try {
      const comment = await this.commentRepository.findOneOrFail({ id });
      this.commentRepository.merge(comment, data);
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteComment(id: string) {
    try {
      await this.commentRepository.findOneOrFail({ id });
      this.commentRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
