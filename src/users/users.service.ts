import { Injectable } from '@nestjs/common';
import { users } from '../data/data';
@Injectable()
export class UsersService {
  async findAll(): Promise<{ username: string; id: number }[]> {
    return users;
  }

  async find(id: number): Promise<{ username: string; id: number } | null> {
    return users.some((user) => user.id === id)
      ? users.filter((user) => user.id === id)[0]
      : null;
  }

  async findUserByName(
    name: string,
  ): Promise<{ username: string; id: number } | null> {
    return users.some((user) => user.username === name)
      ? users.filter((user) => user.username === name)[0]
      : null;
  }
}
