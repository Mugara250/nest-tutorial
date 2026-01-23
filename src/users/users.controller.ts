import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<{ username: string; id: number }[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async find(
    @Param('id') id: string,
  ): Promise<{ username: string; id: number }> {
    const user = await this.usersService.find(+id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`)
    }
    return user
  }
}
