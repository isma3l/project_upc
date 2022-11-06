import { Router } from 'express';

import { Routes } from '@/interfaces';
import { authMiddleware, validationMiddleware } from '@middlewares';
import { TokenController } from '@controllers';
import { CreateTokentDto } from '@dtos';

class TokenRoute implements Routes {
  public path = '/projects';
  public router: Router = Router();
  private tokenController: TokenController = new TokenController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:projectId/tokens`, authMiddleware, validationMiddleware(CreateTokentDto), this.tokenController.createToken);
    this.router.get(`${this.path}/:projectId/tokens`, authMiddleware, this.tokenController.getTokens);
    this.router.get(`${this.path}/:projectId/tokens/:tokenId`, authMiddleware, this.tokenController.getTokenById);
    this.router.delete(`${this.path}/:projectId/tokens/:tokenId`, authMiddleware, this.tokenController.deleteTokens);
    this.router.put(
      `${this.path}/:projectId/tokens/:tokenId`,
      authMiddleware,
      validationMiddleware(CreateTokentDto),
      this.tokenController.updateTokenById,
    );
  }
}

export default TokenRoute;
