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

    return this.usersService.findAll(parseInt(limit, 10), parseInt(offset, 10));
  }

  @Query('user')
  async getUser(obj, args, context, info) {
    const { id } = args;
    return this.usersService.find(id);
  }
}
