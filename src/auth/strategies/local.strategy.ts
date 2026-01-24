import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
type SignInData = { userID: number; username: string };

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<SignInData> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new UnauthorizedException('Not authorized');
    }

    return user;
  }
}
