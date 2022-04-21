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
import { DiaresService } from './diares.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@SkipThrottle(true)
@Controller('api/diares')
export class DiaresController {
  constructor(private readonly diaryService: DiaresService) {}

  @Get()
  async seeAllDiares() {
    return await this.diaryService.seeAllDiaries();
  }

  @Get(':id')
  async seeOneDiary(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.diaryService.seeOneDiary({ id });
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDiary(@Body() body: CreateDiaryDto, @Req() req: any) {
    return await this.diaryService.createDiary(body, req);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateDiary(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDiaryDto,
  ) {
    return await this.diaryService.updateDiary(id, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDiary(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.diaryService.deleteDiary(id);
  }
}
