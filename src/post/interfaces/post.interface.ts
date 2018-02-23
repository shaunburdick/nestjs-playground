import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../../user/interfaces/user.interface';

export class PostDto {
  @ApiModelProperty({
    description: 'Name of the post'
  })
  name: string;

  @ApiModelProperty({
    description: 'Body of the post'
  })
  body: string;

  @ApiModelProperty({
    description: 'Author ID of the post'
  })
  authorId: string;
}

export class Post extends PostDto {
  @ApiModelProperty({
    description: 'ID of the post'
  })
  id: string;

  @ApiModelProperty({
    description: 'Date of the post',
    type: String
  })
  created: Date;

  @ApiModelProperty({
    description: 'Comments for the post'
  })
  comments: Comment[];
}

export class CommentDto {
  @ApiModelProperty({
    description: 'Body of the comment'
  })
  body: string;

  @ApiModelProperty({
    description: 'Author ID of the comment'
  })
  authorId: string;
}

export class Comment extends CommentDto {
  @ApiModelProperty({
    description: 'ID of the comment'
  })
  id: string;

  @ApiModelProperty({
    description: 'Date of the comment',
    type: String
  })
  created: Date;
}

export class PostPage {
  @ApiModelProperty({
    description: 'Total number of posts'
  })
  totalCount: number;

  @ApiModelProperty({
    description: 'List of posts',
    isArray: true,
    type: Post
  })
  data: Post[];
}

export class CommentPage {
  @ApiModelProperty({
    description: 'Total number of comment'
  })
  totalCount: number;

  @ApiModelProperty({
    description: 'List of comment',
    isArray: true,
    type: Comment
  })
  data: Comment[];
}
