import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { users } from 'src/data/data';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { username: string; password: string };
type SignInData = { userID: number; username: string };
type AuthResult = { accessToken: string; userID: number; username: string };

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('Not authenticated');
    }

    return await this.signIn(user);
  }
  async validateUser(input: AuthInput): Promise<SignInData | undefined> {
    const user = await this.usersService.findUserByName(input.username);
    const password =
      user && users.find((_user) => _user.username === user.username)?.password;

    if (user && password === input.password) {
      return user;
    }
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userID,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, userID: user.userID, username: user.username };
  }
}
