import { StatusCodes } from 'http-status-codes';
import { ethers } from 'ethers';

import { WALLET_SECRET_KEY, API_KEY_ALCHEMY } from '@config';
import { abi } from '@utils/contract';

import { HttpException } from '@exceptions';
import { projectModel } from '@models';
import { UserTokenDto } from '@dtos';

export class ContractService {
  public projects = projectModel;

  public getSbts = async (projectId: string, apiKey: string, walletAddress: string): Promise<UserTokenDto[]> => {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `This project with id ${projectId} was not found`);

    if (projectFound.api_key !== apiKey) throw new HttpException(StatusCodes.CONFLICT, `The apikey ${apiKey} is invalid`);

    const tokens = projectFound.tokens;
    const alchemyProvider = new ethers.providers.AlchemyProvider('goerli', API_KEY_ALCHEMY);
    const signer = new ethers.Wallet(API_KEY_ALCHEMY, alchemyProvider);
    if (tokens.length > 0) {
      const contractInstance = new ethers.Contract('', abi, signer);
    }

    const vec: UserTokenDto[] | PromiseLike<UserTokenDto[]> = [];
    return vec;
    // const userToken = tokens.map(token => {
    //   const provider = new ethers.providers.AlchemyProvider(token.network_name, API_KEY_ALCHEMY);
    //   return {
    //     address: token.address,
    //   };
    // });
  };
}
/* 
// Connect to mainnet (homestead)
provider = new AlchemyProvider();

// Connect to the goerli testnet
// (see EtherscanProvider above for other network examples)
provider = new AlchemyProvider("goerli");

// Connect to mainnet with an API key (these are equivalent)
provider = new AlchemyProvider(null, apiKey);
provider = new AlchemyProvider("homestead", apiKey);

// Connect to the Alchemy WebSocket endpoints with a WebSocketProvider
provider = AlchemyProvider.getWebSocketProvider() */
