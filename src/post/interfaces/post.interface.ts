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
    description: 'Date of the post'
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
    description: 'Date of the comment'
  })
  created: Date;
}
