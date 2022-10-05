import { Router } from 'express';

import { Routes } from '@/interfaces';
import { authMiddleware, validationMiddleware } from '@middlewares';
import { TokenController } from '@controllers';
import { CreateTokentDto } from '@dtos';

class TokenRoute implements Routes {
  public path = '/tokens';
  public router: Router = Router();
  private tokenController: TokenController = new TokenController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, authMiddleware, validationMiddleware(CreateTokentDto), this.tokenController.createToken);
    this.router.get(this.path, authMiddleware, this.tokenController.getAllTokens);
    this.router.get(`${this.path}/:id`, authMiddleware, this.tokenController.getTokenById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.tokenController.deleteTokenById);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateTokentDto), this.tokenController.updateToken);
  }
}

export default TokenRoute;
