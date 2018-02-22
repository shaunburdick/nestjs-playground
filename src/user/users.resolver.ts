import { Resolver, Query, ResolveProperty } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Query('user')
  async getUser(obj, args, context, info) {
    const { id } = args;
    if (id) {
      return [this.usersService.find(id)];
    } else {
      return this.usersService.findAll();
    }
  }
}
