import { StatusCodes } from 'http-status-codes';
import { HttpException } from '@exceptions';
import { TokenDtoMapper } from '@dtoMappers';
import { projectModel } from '@models';
import { CreateTokentDto, TokenDto, UpdateTokenDto } from '@dtos';

export class TokenService {
  public projects = projectModel;

  public async createToken(tokenData: CreateTokentDto, projectId: string): Promise<TokenDto> {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with id ${projectId} was not found`);

    const token = projectFound.tokens.find(token => token.address === tokenData.address);
    if (token) throw new HttpException(StatusCodes.CONFLICT, 'A token with the same address already exists.');

    const size = projectFound.tokens.push(tokenData);
    await projectFound.save();

    return TokenDtoMapper.map(projectFound.tokens[size - 1]);
  }

  public async getProjectTokens(projectId: string): Promise<TokenDto[]> {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with id ${projectId} was not found`);

    return projectFound.tokens.map(token => TokenDtoMapper.map(token));
  }

  public async getTokenById(projectId: string, tokenId: string): Promise<TokenDto> {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with id ${projectId} was not found`);

    const tokenFound = projectFound.tokens.find(token => token._id.toString() === tokenId);
    if (!tokenFound) throw new HttpException(StatusCodes.NOT_FOUND, `The token with id ${tokenId} was not found`);

    return TokenDtoMapper.map(tokenFound);
  }

  public async deleteTokenById(projectId: string, tokenId: string): Promise<TokenDto> {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with id ${projectId} was not found`);

    const tokenFound = projectFound.tokens.find(token => token._id.toString() === tokenId);
    if (!tokenFound) throw new HttpException(StatusCodes.NOT_FOUND, `The token with id ${tokenId} was not found`);

    projectFound.tokens.pull({ _id: tokenId });
    await projectFound.save();

    return TokenDtoMapper.map(tokenFound);
  }

  public async updateToken(projectId: string, tokenId: string, tokenData: UpdateTokenDto): Promise<TokenDto> {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with id ${projectId} was not found`);

    const tokenFound = projectFound.tokens.find(token => token._id.toString() === tokenId);
    if (!tokenFound) throw new HttpException(StatusCodes.NOT_FOUND, `The token with id ${tokenId} was not found`);

    const { address, name, network_name } = tokenData;
    await this.projects.updateOne(
      { _id: projectId, 'tokens._id': tokenId },
      { $set: { 'tokens.$.name': name, 'tokens.$.address': address, 'tokens.$.network_name': network_name } },
    );

    return TokenDtoMapper.map({ ...tokenData, _id: tokenId });
  }
}
