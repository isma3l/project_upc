import { Router } from 'express';

import { Routes } from '@/interfaces';
import { ContractController } from '@controllers';

class ContractRoute implements Routes {
  public path = '/sbts/projects';
  public router: Router = Router();
  private contractController: ContractController = new ContractController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/apikey/:apiKey/wallet/:walletAddress`, this.contractController.getSbtsFromUser);
    this.router.post(`${this.path}/apikey/:apiKey/wallet/:walletAddress`, this.contractController.mintSbt);
  }
}

export default ContractRoute;
