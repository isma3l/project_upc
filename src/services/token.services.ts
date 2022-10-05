import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/exceptions';
import { TokenDtoMapper } from '@dtoMappers';
import { tokenModel } from '@/models';
import { CreateTokentDto, TokenDto } from '@/dtos';
import { Token } from '@/interfaces';

export class TokenService {
  public tokens = tokenModel;

  public async createToken(tokenData: CreateTokentDto): Promise<TokenDto> {
    const tokenFound = await this.tokens.find({ address: tokenData.address });
    if (tokenFound) throw new HttpException(StatusCodes.CONFLICT, 'This token already exists');

    const createdTokenData: Token = await this.tokens.create(tokenData);

    return TokenDtoMapper.map(createdTokenData);
  }
}
