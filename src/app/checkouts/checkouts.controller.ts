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
import { CheckoutsService } from './checkouts.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';

@SkipThrottle(true)
@Controller('api/checkouts')
export class CheckoutsController {
  constructor(private readonly checkoutService: CheckoutsService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async seeAllCheckouts() {
    return await this.checkoutService.seeAllCheckouts();
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async seeOneCheckout(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.checkoutService.seeOneCheckout({ id });
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCheckout(@Body() body: CreateCheckoutDto) {
    return await this.checkoutService.createCheckout(body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateCheckout(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCheckoutDto,
  ) {
    return await this.checkoutService.updateCheckout(id, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCheckout(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.checkoutService.deleteCheckout(id);
  }
}
