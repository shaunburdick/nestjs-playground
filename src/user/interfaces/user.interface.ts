import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty({
    description: 'Name of the user'
  })
  readonly name: string;

  @ApiModelProperty({
    description: 'Email of the user'
  })
  readonly email: string;
}

export class User extends UserDto {
  @ApiModelProperty({
    description: 'ID of the user'
  })
  id: string;
}
