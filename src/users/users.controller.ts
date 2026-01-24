import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
type User = { userID: number, username: string }

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // this must be placed below static routes to prevent it from intercepting their requests
  @Get(':id')
  async find(
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.usersService.find(+id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`)
    }
    return user
  }
}
