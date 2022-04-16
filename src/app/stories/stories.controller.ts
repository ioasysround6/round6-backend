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
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from 'src/auth/decorator/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/config/enum/role.enum';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoriesService } from './stories.service';

@SkipThrottle(true)
@Controller('api/stories')
export class StoriesController {
  constructor(private readonly storyService: StoriesService) {}

  @Get()
  async seeAllStories() {
    return await this.storyService.seeAllStories();
  }

  @Get(':id')
  async seeOneStory(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.storyService.seeOneStory({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStory(@Body() body: CreateStoryDto) {
    return await this.storyService.createStory(body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateStoryDto,
  ) {
    return await this.storyService.updateStory({ id }, body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStory(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.storyService.deleteStory(id);
  }
}
