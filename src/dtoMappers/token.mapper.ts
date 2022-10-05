import { TokenDto } from '@/dtos';
import { Token } from '@/interfaces';

export class TokenDtoMapper {
  static map(token: Token): TokenDto {
    const { _id, address, name, network_name } = token;
    return new TokenDto(_id, address, name, network_name);
  }
}
