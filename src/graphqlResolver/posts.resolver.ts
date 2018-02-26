import { Resolver, Query, ResolveProperty, Mutation } from '@nestjs/graphql';
import { PostsService } from '../post/posts.service';
import { UsersService } from '../user/users.service';
import { Post, Comment } from '../post/interfaces/post.interface';

@Resolver('Post')
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService
  ) {}

  @Query('posts')
  async getPosts(obj, args, context, info) {
    const { limit, offset, sort } = args;

    return this.postsService.findAll({
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      sort
    });
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

  @Mutation('createPost')
  async createPost(obj, { postDto }, context, info): Promise<Post> {
    return this.postsService.create(postDto);
  }

  @Mutation('addComment')
  async addComment(obj, { postId, commentDto }, context, info): Promise<Comment> {
    return this.postsService.addComment(postId, commentDto);
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
