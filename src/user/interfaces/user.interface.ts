import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty({
    description: 'Name of the user'
  })
  name: string;

  @ApiModelProperty({
    description: 'Email of the user'
  })
  email: string;
}

export class User extends UserDto {
  @ApiModelProperty({
    description: 'ID of the user'
  })
  id: string;
}

export class UserPage {
  @ApiModelProperty({
    description: 'Total number of users'
  })
  totalCount: number;

  @ApiModelProperty({
    description: 'List of users',
    isArray: true,
    type: User
  })
  data: User[];
}
