import { TokenDto } from '@/dtos';
import { Token } from '@/interfaces';

export class TokenDtoMapper {
  static map(token: Token): TokenDto {
    const { address, name, network_name } = token;
    return new TokenDto(address, name, network_name);
  }
}
