import { Controller, Get, Post as HttpPost, Body, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ApiProduces, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { PostDto, PostPage, Post, Comment, CommentDto } from './interfaces/post.interface';

@ApiProduces('application/json')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @HttpCode(201)
  @ApiOperation({
    title: 'Create Post'
  })
  @ApiResponse({
    status: 201,
    description: 'The created post with ID',
    type: Post
  })
  async create(@Body() postDto: PostDto): Promise<Post> {
    return this.postsService.create(postDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get all posts'
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all the posts',
    type: PostPage
  })
  @ApiImplicitQuery({
    name: 'limit',
    required: false
  })
  @ApiImplicitQuery({
    name: 'offset',
    required: false
  })
  @ApiImplicitQuery({
    name: 'sort',
    required: false
  })
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('sort') sort?: string
  ): Promise<PostPage> {
    return this.postsService.findAll({
      limit: parseInt(limit || '', 10),
      offset: parseInt(offset || '', 10),
      sort: PostsService.parseSort(sort || '')
    });
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get a post by id'
  })
  @ApiResponse({
    status: 200,
    description: 'The found post',
    type: Post
  })
  async find(@Param('id') id: string): Promise<Post | undefined> {
    return this.postsService.find(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    title: 'Delete a post by id'
  })
  @ApiResponse({
    status: 204
  })
  async remove(@Param('id') id: string): Promise<void> {
    this.postsService.remove(id);
  }

  @HttpPost(':id/comments')
  @HttpCode(201)
  @ApiOperation({
    title: 'Add comment to post'
  })
  @ApiResponse({
    status: 201,
    description: 'The created comment with ID',
    type: Comment
  })
  async createComment(@Param('id') postId: string, @Body() commentDto: CommentDto): Promise<Comment> {
    return this.postsService.addComment(postId, commentDto);
  }

  @Delete(':id/comments/:commentId')
  @HttpCode(204)
  @ApiOperation({
    title: 'Delete a comment from post'
  })
  @ApiResponse({
    status: 204
  })
  async deleteComment(@Param('id') postId: string, @Param('commentId') commentId: string): Promise<void> {
    this.postsService.removeComment(postId, commentId);
  }

}
