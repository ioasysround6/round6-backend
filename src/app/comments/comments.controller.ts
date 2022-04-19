import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/config/enum/role.enum';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@SkipThrottle(true)
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  async seeAllComments() {
    return await this.commentService.seeAllComments();
  }

  @Get(':id')
  async seeOneComment(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.commentService.seeOneComment({ id });
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() body: CreateCommentDto, @Req() req: any) {
    return await this.commentService.createComment(body, req);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateComment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(id, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.commentService.deleteComment(id);
  }
}
