import { Component } from '@nestjs/common';
import { User, UserDto, UserPage } from './interfaces/user.interface';
import { MemoryService, Page, FilterSortOpts } from '../mem.service';
import * as shortid from 'shortid';

@Component()
export class UsersService extends MemoryService<User> {

  async create(userDto: UserDto): Promise<User> {
    const idx = this.data.push({
      id: shortid.generate(),
      ...userDto
    });

    return this.data[idx - 1];
  }
}
