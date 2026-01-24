import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guards';
type AuthResult = { accessToken: string; userID: number; username: string };
type AuthInput = { username: string; password: string };
type UserInfo = { userID: string; password: string };

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() input: AuthInput): Promise<AuthResult> {
    return await this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async getUserInfo(@Request() request): Promise<UserInfo> {
    return request.user;
  }
}
