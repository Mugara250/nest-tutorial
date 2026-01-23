import { Injectable } from '@nestjs/common';
import { users } from '../data/data';
type User = { userID: number, username: string }
@Injectable()
export class UsersService {
  async findAll(): Promise<User[]> {
    return users;
  }

  async find(id: number): Promise<User | null> {
    return users.some((user) => user.userID === id)
      ? users.filter((user) => user.userID === id)[0]
      : null;
  }

  async findUserByName(
    name: string,
  ): Promise<User | undefined> {
    return users.find((user) => user.username === name)
  }
}
