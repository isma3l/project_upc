import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ContractService } from '@services';

export class ContractController {
  contractService: ContractService = new ContractService();

  public getSbtsFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { apiKey, walletAddress } = req.params;

      const sbts = await this.contractService.getSbts(apiKey, walletAddress);

      res.status(StatusCodes.OK).json({ sbts });
    } catch (error) {
      next(error);
    }
  };

  public mintSbt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { apiKey, walletAddress } = req.params;
      const sbts = await this.contractService.minSbt(apiKey, walletAddress);

      res.status(StatusCodes.OK).json({ sbts });
    } catch (error) {
      next(error);
    }
  };
}
