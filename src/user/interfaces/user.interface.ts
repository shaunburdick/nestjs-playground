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
