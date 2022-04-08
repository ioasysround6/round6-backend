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
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ToursService } from './tours.service';

@SkipThrottle(true)
@Controller('api/tours')
export class ToursController {
  constructor(private readonly tourService: ToursService) {}

  @Get()
  async seeAllTours() {
    return await this.tourService.seeAllTours();
  }

  @Get(':id')
  async seeOneTour(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tourService.seeOneTour({ id });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTour(@Body() body: CreateTourDto) {
    return await this.tourService.createTour(body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateTour(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTourDto,
  ) {
    return await this.tourService.updateTour(id, body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTour(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.tourService.deleteTour(id);
  }
}
