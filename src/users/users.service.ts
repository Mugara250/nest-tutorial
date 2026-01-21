import { Injectable } from '@nestjs/common';
import { users } from '../data/data';
@Injectable()
export class UsersService {
  findAll(): { username: string; id: number }[] {
    return users;
  }

  find(id: number): { username: string; id: number } {
    return users.filter(user => user.id === id)[0];
  }
}
