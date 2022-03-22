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
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { verifyTokenId } from 'src/helpers/function.helper';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProfile(@Param('id') id: string, @Req() req: any) {
    const user = await this.userService.getProfile({ id });
    verifyTokenId(req.user, user);
    return user;
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async createProfile(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register/admin')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() body: CreateUserDto) {
    return await this.userService.createAdmin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateProfile(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    verifyTokenId(req.user, user);
    return await this.userService.updateUser(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password/:id')
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserPasswordDto,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    verifyTokenId(req.user, user);
    return await this.userService.updateUserPassword(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async adminDeleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: any,
  ) {
    const user = await this.userService.getProfile({ id });
    verifyTokenId(req.user, user);
    await this.userService.deleteUser(id);
  }
}
