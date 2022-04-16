import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/app/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokensService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    await this.tokenService.saveToken(token, user.id);
    user.password = undefined;
    user.deletedAt = undefined;
    return {
      token: token,
      user,
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.checkUser({ email });
    } catch (error) {
      hashSync(password, 10);
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
