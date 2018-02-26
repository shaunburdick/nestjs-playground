import { Resolver, Query, ResolveProperty, Mutation } from '@nestjs/graphql';
import { UsersService } from '../user/users.service';
import { PostsService } from '../post/posts.service';
import { User, UserDto } from '../user/interfaces/user.interface';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService
  ) {}

  @Query('users')
  async getUsers(obj, args, context, info) {
    const { limit, offset, sort } = args;

    return this.usersService.findAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      sort
    });
  }

  @Query('user')
  async getUser(obj, args, context, info) {
    const { id } = args;
    return this.usersService.find(id);
  }

  @ResolveProperty('posts')
  async getPosts(user, args) {
    const { limit, offset, sort } = args;

    return this.postsService.getPostsByUserId(user.id, {
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      sort
    });
  }

  @ResolveProperty('comments')
  async getComments(user, args) {
    const { limit, offset, sort } = args;

    return this.postsService.getCommentsByUserId(user.id, {
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      sort
    });
  }

  @Mutation('createUser')
  async createUser(obj, { userDto }, context, info): Promise<User> {
    return this.usersService.create(userDto);
  }
}
