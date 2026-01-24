import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Access denied');
    }
    const token = authorization?.split(' ')[1];

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.user = {
        userID: tokenPayload.sub,
        username: tokenPayload.username,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Access denied');
    }
  }
}
