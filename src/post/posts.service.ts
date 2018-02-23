import { Component } from '@nestjs/common';
import { Comment, CommentDto, Post, PostDto } from './interfaces/post.interface';
import * as shortid from 'shortid';

@Component()
export class PostsService {
  private posts: Post[] = [];

  async create(postDto: PostDto): Promise<Post> {
    const idx = this.posts.push({
      id: shortid.generate(),
      created: new Date(),
      comments: [],
      ...postDto
    });

    return this.posts[idx - 1];
  }

  async findAll(): Promise<Post[]> {
    return this.posts;
  }

  async find(id: string): Promise<Post | undefined> {
    return this.posts.find((post) => post.id === id);
  }

  async remove(id: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.id !== id);
  }

  async addComment(postId: string, commentDto: CommentDto): Promise<Comment> {
    const post = await this.find(postId);
    if(!post) {
      throw new Error('Post not found.');
    }

    const comment: Comment = {
      id: shortid.generate(),
      created: new Date(),
      ...commentDto
    };

    post.comments.push(comment);

    return comment;
  }

  async removeComment(postId: string, commentId: string): Promise<void> {
    const post = await this.find(postId);
    if(!post) {
      throw new Error('Post not found.');
    }

    post.comments = post.comments.filter((comment) => comment.id !== commentId);
  }
}
