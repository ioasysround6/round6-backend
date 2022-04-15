import { Body, Controller, Put } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokensService } from './tokens.service';

@SkipThrottle(true)
@Controller('api/tokens')
export class TokensController {
  constructor(private readonly tokenService: TokensService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return await this.tokenService.refreshToken(data.oldToken);
  }
}
