import { Component } from '@nestjs/common';
import { User, UserDto } from './interfaces/user.interface';
import * as shortid from 'shortid';

@Component()
export class UsersService {
  private users: User[] = [];

  async create(userDto: UserDto): Promise<User> {
    const idx = this.users.push({
      id: shortid.generate(),
      ...userDto
    });

    return this.users[idx - 1];
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async find(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async remove(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
