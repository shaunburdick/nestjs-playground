import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserDto } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.find(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.usersService.remove(id);
  }

}
