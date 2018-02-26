import { Component } from '@nestjs/common';
import { Comment, CommentDto, CommentPage, Post, PostDto, PostPage } from './interfaces/post.interface';
import { MemoryService, Page, FilterSortOpts } from '../mem.service';
import * as shortid from 'shortid';

@Component()
export class PostsService extends MemoryService<Post> {

  async create(postDto: PostDto): Promise<Post> {
    const idx = this.data.push({
      id: shortid.generate(),
      created: new Date(),
      comments: [],
      ...postDto
    });

    return this.data[idx - 1];
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

  async getPostsByUserId(userId: string, opts: FilterSortOpts): Promise<Page<Post>> {
    const data = this.data.filter((post) => post.authorId === userId);

    return this.filterAndSort(data, opts);
  }

  async getCommentsByUserId(userId: string, opts: FilterSortOpts): Promise<Page<Comment>> {
    const data = this.data
      .map((post) => post.comments.filter((comment) => comment.authorId === userId))
      .reduce((obj, postComments) => obj.concat(postComments), []);

    return this.filterAndSort(data, opts);
  }
}
