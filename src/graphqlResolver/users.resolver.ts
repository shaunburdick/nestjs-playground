import { Resolver, Query, ResolveProperty } from '@nestjs/graphql';
import { UsersService } from '../user/users.service';
import { PostsService } from '../post/posts.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService
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

  @ResolveProperty('posts')
  async getPosts(user) {
    return this.postsService.getPostsByUserId(user.id);
  }

  @ResolveProperty('comments')
  async getComments(user) {
    return this.postsService.getCommentsByUserId(user.id);
  }
}
