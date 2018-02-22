export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserDto {
  readonly name: string;
  readonly email: string;
}
