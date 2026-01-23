import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { users } from 'src/data/data';

type AuthInput = { username: string; password: string };
type SignInData = { userID: number; username: string };
type AuthResult = { accessToken: string; userID: number; username: string };

@Injectable()
export class AuthService {
  public constructor(private readonly usersService: UsersService) {}
  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validate(input);

    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }
    return {
      accessToken: 'afkjadlfjlafjldaksjfdakjfadjfkda',
      userID: user.userID,
      username: user.username,
    };
  }
  async validate(input: AuthInput): Promise<SignInData | undefined> {
    const user = await this.usersService.findUserByName(input.username);
    const password = users.find(
      (_user) => _user.username === user?.username,
    )?.password;

    if (user && password === input.password) {
      return user;
    }
  }
}
