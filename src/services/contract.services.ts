import { StatusCodes } from 'http-status-codes';

import { getContractInstance, isAddress } from '@contract';
import { HttpException } from '@exceptions';
import { projectModel } from '@models';
import { SbtDto } from '@dtos';

export class ContractService {
  public projects = projectModel;

  public getSbts = async (api_key: string, walletAddress: string): Promise<SbtDto[]> => {
    const projectFound = await this.projects.findOne({ api_key });
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with api key ${api_key} was not found`);

    if (!isAddress(walletAddress)) throw new HttpException(StatusCodes.BAD_REQUEST, `the wallet address ${walletAddress} is invalid`);

    const tokens = projectFound.tokens;
    const result: SbtDto[] = [];

    for (const token of tokens) {
      const contract = getContractInstance(token.address);
      const logs = await contract.queryFilter(contract.filters.Transfer(null, walletAddress));

      const sbt: SbtDto = {
        sbt_address: token.address,
        sbt_name: token.name,
        ids: [],
      };

      for (const log of logs) {
        if (log.args) {
          const { tokenId } = log.args;
          sbt.ids.push(tokenId.toString());
        }
      }

      if (sbt.ids.length > 0) {
        result.push(sbt);
      }
    }

    return result;
  };
}
