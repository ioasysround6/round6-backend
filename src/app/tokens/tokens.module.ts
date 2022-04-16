import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TokensController } from './tokens.controller';
import { TokensEntity } from './tokens.entity';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokensEntity]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
