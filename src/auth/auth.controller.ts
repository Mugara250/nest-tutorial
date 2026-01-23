import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
type AuthResult = { accessToken: string; userID: number; username: string };
type AuthInput = { username: string; password: string };

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() input: AuthInput): Promise<AuthResult> {
    return await this.authService.authenticate(input);
  }
}
