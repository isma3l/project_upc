import { StatusCodes } from 'http-status-codes';

import { getPlatformSbtFromUser, isAddress, mintSBT, getSbtsFromUser } from '@contract';
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

    const sbts: SbtDto[] = await getSbtsFromUser(tokens, walletAddress);
    return sbts;
  };

  public minSbt = async (api_key: string, walletAddress: string): Promise<SbtDto[]> => {
    const projectFound = await this.projects.findOne({ api_key });
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `The project with api key ${api_key} was not found`);

    if (!isAddress(walletAddress)) throw new HttpException(StatusCodes.BAD_REQUEST, `the wallet address ${walletAddress} is invalid`);

    await mintSBT(walletAddress);

    const sbts: SbtDto[] = await getPlatformSbtFromUser(walletAddress);
    return sbts;
  };
}
