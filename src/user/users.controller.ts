import { Controller, Get, Post as HttpPost, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiProduces, ApiOperation, ApiResponse, ApiImplicitQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User, UserDto, UserPage } from './interfaces/user.interface';
import { PostsService } from '../post/posts.service';
import { Post, PostPage, Comment, CommentPage } from '../post/interfaces/post.interface';

@ApiProduces('application/json')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService
  ) {}

  @HttpPost()
  @ApiOperation({
    title: 'Create User'
  })
  @ApiResponse({
    status: 201,
    description: 'The created user with ID',
    type: User
  })
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get all users'
  })
  @ApiResponse({
    status: 200,
    description: 'A list of all the users',
    type: UserPage
  })
  @ApiImplicitQuery({
    name: 'limit',
    required: false
  })
  @ApiImplicitQuery({
    name: 'offset',
    required: false
  })
  async findAll(@Query('limit') limit?: string, @Query('offset') offset?: string): Promise<UserPage> {
    return this.usersService.findAll(parseInt(limit || '', 10), parseInt(offset || '', 10));
  }

  @Get(':id')
  @ApiOperation({
    title: 'Get a user by id'
  })
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: User
  })
  async find(@Param('id') id: string): Promise<User | undefined> {
    return this.usersService.find(id);
  }

  @Delete(':id')
  @ApiOperation({
    title: 'Delete a user by id'
  })
  @ApiResponse({
    status: 201
  })
  async remove(@Param('id') id: string): Promise<void> {
    this.usersService.remove(id);
  }

  @Get(':id/posts')
  @ApiOperation({
    title: 'Get posts by user id'
  })
  @ApiImplicitQuery({
    name: 'limit',
    required: false
  })
  @ApiImplicitQuery({
    name: 'offset',
    required: false
  })
  async getPostsByUserId(
    @Param('id') id: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string
  ): Promise<PostPage> {
    return this.postsService.getPostsByUserId(id, parseInt(limit || '', 10), parseInt(offset || '', 10));
  }

  @Get(':id/comments')
  @ApiOperation({
    title: 'Get comments by user id'
  })
  @ApiImplicitQuery({
    name: 'limit',
    required: false
  })
  @ApiImplicitQuery({
    name: 'offset',
    required: false
  })
  async getCommentsByUserId(
    @Param('id') id: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string
  ): Promise<CommentPage> {
    return this.postsService.getCommentsByUserId(id, parseInt(limit || '', 10), parseInt(offset || '', 10));
  }

}
