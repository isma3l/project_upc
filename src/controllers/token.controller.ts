import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { TokenService } from '@services';
import { CreateTokentDto, TokenDto, UpdateTokenDto } from '@dtos';
import { RequestWithUser } from '@interfaces';

export class TokenController {
  public tokenService: TokenService = new TokenService();

  public createToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;
      const tokenData: CreateTokentDto = req.body;
      const createdTokenData: TokenDto = await this.tokenService.createToken(tokenData, projectId);

      res.status(StatusCodes.CREATED).json(createdTokenData);
    } catch (error) {
      next(error);
    }
  };

  public getTokens = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.projectId;
      const tokens: TokenDto[] = await this.tokenService.getProjectTokens(projectId);
      res.status(StatusCodes.OK).json({ tokens });
    } catch (error) {
      next(error);
    }
  };

  public getTokenById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { tokenId, projectId } = req.params;
      const tokenData: TokenDto = await this.tokenService.getTokenById(projectId, tokenId);

      res.status(StatusCodes.OK).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public deleteTokens = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { tokenId, projectId } = req.params;
      const deletedToken: TokenDto = await this.tokenService.deleteTokenById(projectId, tokenId);

      res.status(StatusCodes.OK).json(deletedToken);
    } catch (error) {
      next(error);
    }
  };

  public updateTokenById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { tokenId, projectId } = req.params;
      const tokenData: UpdateTokenDto = req.body;
      const updatedProject = await this.tokenService.updateToken(projectId, tokenId, tokenData);

      res.status(StatusCodes.OK).json(updatedProject);
    } catch (error) {
      next(error);
    }
  };
}
