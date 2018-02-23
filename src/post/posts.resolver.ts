import { Resolver, Query, ResolveProperty } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { UsersService } from '../user/users.service';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService
  ) {}

  @Query('posts')
  async getPosts(obj, args, context, info) {
    const { limit, offset } = args;

    return this.postsService.findAll(parseInt(limit, 10), parseInt(offset, 10));
  }

  @Query('post')
  async getPost(obj, args, context, info) {
    const { id } = args;
    return this.postsService.find(id);
  }

  @ResolveProperty('author')
  async getAuthor(post) {
    return this.usersService.find(post.authorId);
  }

  @ResolveProperty('commentsCount')
  async getCommentsCount(post) {
    return post.comments.length;
  }

}

@Resolver('Comment')
export class CommentsResolver {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @ResolveProperty('author')
  async getAuthor(comment) {
    return this.usersService.find(comment.authorId);
  }
}
