import { Component } from '@nestjs/common';
import { User, UserDto, UserPage } from './interfaces/user.interface';
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

  async findAll(limit?: number, offset?: number): Promise<UserPage> {
    let data = this.users;
    const totalCount = data.length;

    if (offset) {
      data = data.slice(offset);
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    return {
      totalCount,
      data
    };
  }

  async find(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async remove(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
