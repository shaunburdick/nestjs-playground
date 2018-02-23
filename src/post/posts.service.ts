import { Component } from '@nestjs/common';
import { Comment, CommentDto, CommentPage, Post, PostDto, PostPage } from './interfaces/post.interface';
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

  async findAll(limit?: number, offset?: number): Promise<PostPage> {
    let data = this.posts;
    const totalCount = data.length;

    if (offset) {
      data = data.slice(offset);
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    return {
      totalCount,
      data
    };
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

  async getPostsByUserId(userId: string, limit?: number, offset?: number): Promise<PostPage> {
    let data = this.posts.filter((post) => post.authorId === userId);

    const totalCount = data.length;

    if (offset) {
      data = data.slice(offset);
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    return {
      totalCount,
      data
    };
  }

  async getCommentsByUserId(userId: string, limit?: number, offset?: number): Promise<CommentPage> {
    let data = this.posts
      .map((post) => post.comments.filter((comment) => comment.authorId === userId))
      .reduce((obj, postComments) => obj.concat(postComments), []);

    const totalCount = data.length;

    if (offset) {
      data = data.slice(offset);
    }

    if (limit) {
      data = data.slice(0, limit);
    }

    return {
      totalCount,
      data
    };
  }
}
