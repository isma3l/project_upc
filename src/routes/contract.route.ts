import { Router } from 'express';

import { Routes } from '@/interfaces';
import { authMiddleware } from '@middlewares';
import { ContractController } from '@controllers';

class ContractRoute implements Routes {
  public path = '/sbts/projects';
  public router: Router = Router();
  private contractController: ContractController = new ContractController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:projectId/wallet/:address`, authMiddleware, this.contractController.getSbtsFromUser);
  }
}

export default ContractRoute;
