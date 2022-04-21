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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async seeAllPayments() {
    return await this.paymentService.seeAllPayments();
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async seeOnePayment(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.paymentService.seeOnePayment({ id });
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() body: CreatePaymentDto) {
    return await this.paymentService.createPayment(body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePayment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdatePaymentDto,
  ) {
    return await this.paymentService.updatePayment({ id }, body);
  }

  @Roles(Role.Admin, Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePayment(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.paymentService.deletePayment(id);
  }
}
