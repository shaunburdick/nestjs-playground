import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiProduces, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User, UserDto } from './interfaces/user.interface';

@ApiProduces('application/json')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    title: 'Create User'
  })
  @ApiResponse({
    status: 201,
    description: 'The created user with ID',
    type: User
  })
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get all users'
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all the users',
    type: User,
    isArray: true
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get a user by id'
  })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: User
  })
  async find(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.find(id);
  }

  @Delete(':id')
  @ApiOperation({
    title: 'Delete a user by id'
  })
  @ApiResponse({
    status: 201
  })
  async remove(@Param('id') id: string): Promise<void> {
    this.usersService.remove(id);
  }

}
