import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ContractService } from '@services';

export class ContractController {
  contractService: ContractService = new ContractService();

  public getSbtsFromUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, walletAddress } = req.params;
      const apiKey = req.headers['apikey'] as string;

      const sbts = await this.contractService.getSbts(projectId, apiKey, walletAddress);

      res.status(StatusCodes.OK).json({ sbts });
    } catch (error) {
      next(error);
    }
  };
}
