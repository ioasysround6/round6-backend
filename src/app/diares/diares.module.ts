import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { DiaresController } from './diares.controller';
import { DiaresEntity } from './diares.entity';
import { DiaresService } from './diares.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiaresEntity]), UsersModule],
  controllers: [DiaresController],
  providers: [DiaresService],
  exports: [DiaresService],
})
export class DiaresModule {}
