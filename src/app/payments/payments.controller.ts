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
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsService } from './payments.service';

@SkipThrottle(true)
@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async seePaymentMethod(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.paymentService.seePaymentMethod({ id });
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaymentMethod(@Body() body: CreatePaymentDto) {
    return await this.paymentService.createPaymentMethod(body);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updatePaymentMethod(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePaymentDto,
  ) {
    return await this.paymentService.updatePaymentMethod(id, body);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePaymentMethod(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.paymentService.deletePaymentMethod(id);
  }
}
