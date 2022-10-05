import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@exceptions';
import { TokenDtoMapper } from '@dtoMappers';
import { tokenModel } from '@models';
import { CreateTokentDto, TokenDto, UpdateTokenDto } from '@dtos';
import { Token } from '@interfaces';

export class TokenService {
  public tokens = tokenModel;

  public async createToken(tokenData: CreateTokentDto): Promise<TokenDto> {
    const tokenFound = await this.tokens.findOne({ address: tokenData.address });
    if (tokenFound) throw new HttpException(StatusCodes.CONFLICT, 'A token with the same address already exists.');

    const createdTokenData: Token = await this.tokens.create(tokenData);
    return TokenDtoMapper.map(createdTokenData);
  }

  public async getAllTokens(): Promise<TokenDto[]> {
    const projects = await this.tokens.find();
    return projects.map(token => TokenDtoMapper.map(token));
  }

  public async getTokenById(tokenId: string): Promise<TokenDto> {
    const TokenFound = await this.tokens.findById(tokenId);
    if (!TokenFound) throw new HttpException(StatusCodes.NOT_FOUND, `This token with id ${tokenId} was not found`);

    return TokenDtoMapper.map(TokenFound);
  }

  public async deleteTokenById(tokenId: string): Promise<TokenDto> {
    const tokenDeleted = await this.tokens.findByIdAndDelete(tokenId);
    if (!tokenDeleted) throw new HttpException(StatusCodes.NOT_FOUND, `This token with id ${tokenId} was not found`);

    return TokenDtoMapper.map(tokenDeleted);
  }

  public async updateToken(tokenId: string, tokenData: UpdateTokenDto): Promise<TokenDto> {
    const tokenFound = await this.tokens.findById(tokenId);
    if (!tokenFound) throw new HttpException(StatusCodes.NOT_FOUND, `This token with id ${tokenId} was not found`);

    // the array can be empty or have at most one sbt with the same address
    const tokens = await this.tokens.find({ address: tokenData.address });

    // if the ids are different, you want to use the address that is being used by another sbt
    if (tokens.length > 0 && tokens[0]._id.toString() !== tokenId)
      throw new HttpException(StatusCodes.CONFLICT, 'A token with the same address exists');

    const tokenUpdated = await this.tokens.findByIdAndUpdate(tokenId, tokenData, { new: true });
    if (!tokenUpdated) throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, 'An error occurred while updating the token');

    return TokenDtoMapper.map(tokenUpdated);
  }
}
