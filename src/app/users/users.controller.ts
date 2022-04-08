import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/config/enum/role.enum';

@SkipThrottle(true)
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return await this.userService.getProfile(req.user);
  }

  @SkipThrottle(false)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUserAccount(@Body() body: CreateUserDto) {
    return await this.userService.createUserAccount(body);
  }

  @SkipThrottle(false)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin')
  @HttpCode(HttpStatus.CREATED)
  async createAdminAccount(@Body() body: CreateUserDto) {
    return await this.userService.createAdminAccount(body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateAccount(@Req() req: any, @Body() body: UpdateUserDto) {
    return await this.userService.updateAccount(req.user, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async recoverPassword(@Req() req: any, @Body() body: UpdatePasswordDto) {
    return await this.userService.recoverPassword(req.user, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(@Req() req: any) {
    await this.userService.deleteAccount(req.user);
  }
}
