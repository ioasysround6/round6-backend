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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { checkTokenId } from 'src/helpers/function.helper';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/config/enum/role.enum';

@SkipThrottle(true)
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getProfile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    checkTokenId(req.user, user);
    return user;
  }

  @SkipThrottle(false)
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createUserAccount(@Body() body: CreateUserDto) {
    return await this.userService.createUserAccount(body);
  }

  @SkipThrottle(false)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/register')
  @HttpCode(HttpStatus.CREATED)
  async createAdminAccount(@Body() body: CreateUserDto) {
    return await this.userService.createAdminAccount(body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    checkTokenId(req.user, user);
    return await this.userService.updateAccount(id, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('password/:id')
  async recoverPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePasswordDto,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    checkTokenId(req.user, user);
    return await this.userService.recoverPassword(id, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    checkTokenId(req.user, user);
    await this.userService.deleteAccount(id);
  }
}
