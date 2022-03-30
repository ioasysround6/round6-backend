import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursController } from './tours.controller';
import { ToursEntity } from './tours.entity';
import { ToursService } from './tours.service';

@Module({
  imports: [TypeOrmModule.forFeature([ToursEntity])],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
