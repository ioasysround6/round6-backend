import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../orders/orders.module';
import { CheckoutsController } from './checkouts.controller';
import { CheckoutsEntity } from './checkouts.entity';
import { CheckoutsService } from './checkouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([CheckoutsEntity]), OrdersModule],
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
  exports: [CheckoutsService],
})
export class CheckoutsModule {}
