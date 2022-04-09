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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersService } from './orders.service';

@SkipThrottle(true)
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async seeOneOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.orderService.seeOneOrder({ id });
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() body: CreateOrderDto, @Req() req: any) {
    return await this.orderService.createOrder(body, req);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder({ id }, body);
  }

  @Roles(Role.Tourist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.orderService.deleteOrder(id);
  }
}
