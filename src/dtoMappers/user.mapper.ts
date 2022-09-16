import { UserDto } from '@/dtos';
import { User } from '@/interfaces';

export class UserDtoMapper {
  static map(user: User): UserDto {
    return new UserDto(user.email, user.password);
  }
}
