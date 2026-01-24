import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guards';

@Controller('auth-v2')
export class PassportController {
  public constructor(private readonly authService: AuthService) {}

  // we will use a guard that will use a local strategy
  @UseGuards(PassportLocalGuard)
  @Post('login')
  async login(@Req() request) {
    return this.authService.signIn(request.user)
  }

  @Get('me')
  async getUserInfo() {}
}
