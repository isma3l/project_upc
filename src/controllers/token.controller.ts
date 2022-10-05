import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { TokenService } from '@services';
import { CreateTokentDto, TokenDto, UpdateTokenDto } from '@dtos';
import { RequestWithUser } from '@interfaces';

export class TokenController {
  public tokenService: TokenService = new TokenService();

  public createToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const tokenData: CreateTokentDto = req.body;
      const createdTokenData: TokenDto = await this.tokenService.createToken(tokenData);

      res.status(StatusCodes.CREATED).json(createdTokenData);
    } catch (error) {
      next(error);
    }
  };

  public getAllTokens = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const tokens: TokenDto[] = await this.tokenService.getAllTokens();

      res.status(StatusCodes.OK).json({ tokens });
    } catch (error) {
      next(error);
    }
  };

  public getTokenById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenId = req.params.id;
      const tokenData: TokenDto = await this.tokenService.getTokenById(tokenId);

      res.status(StatusCodes.OK).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public deleteTokenById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const tokenId = req.params.id;
      const deletedProject: TokenDto = await this.tokenService.deleteTokenById(tokenId);

      res.status(StatusCodes.OK).json(deletedProject);
    } catch (error) {
      next(error);
    }
  };

  public updateToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const tokenId = req.params.id;
      const tokenData: UpdateTokenDto = req.body;
      const updatedProject = await this.tokenService.updateToken(tokenId, tokenData);

      res.status(StatusCodes.OK).json(updatedProject);
    } catch (error) {
      next(error);
    }
  };
}
