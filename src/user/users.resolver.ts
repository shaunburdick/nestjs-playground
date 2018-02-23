import { Resolver, Query, ResolveProperty } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Query('users')
  async getUsers(obj, args, context, info) {
    const { limit, offset } = args;

    let data = await this.usersService.findAll();
    const totalCount = data.length;

    if(offset) {
      data = data.slice(parseInt(offset, 10));
    }
    if(limit) {
      data = data.slice(0, parseInt(limit, 10));
    }

    return { totalCount, data };
  }

  @Query('user')
  async getUser(obj, args, context, info) {
    const { id } = args;
    return this.usersService.find(id);
  }
}
