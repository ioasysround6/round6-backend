import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../../auth/auth.service';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TokensEntity } from './tokens.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokensEntity)
    private readonly tokenRepository: Repository<TokensEntity>,
    private readonly userService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async saveToken(hash: string, user: any) {
    const tokenObject = await this.tokenRepository.findOne({ user: user });
    if (tokenObject) {
      this.tokenRepository.update(tokenObject.id, {
        hash: hash,
      });
    } else {
      await this.tokenRepository.insert({
        hash: hash,
        user: user,
      });
    }
  }

  async refreshToken(oldtoken: string) {
    try {
      const tokenObject = await createQueryBuilder(TokensEntity, 'tokens')
        .leftJoinAndSelect('tokens.user', 'user')
        .select(['tokens.id', 'tokens.hash', 'user.id'])
        .where('tokens.hash = :hash', { hash: oldtoken })
        .getOne();
      const user = await this.userService.checkUser(tokenObject.user);
      return await this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException(MessageHelper.TOKEN_INVALID);
    }
  }
}
