import { ethers } from 'ethers';

import { Token } from '@interfaces';
import { SbtDto } from '@dtos';
import abi from '../abi';
import { alchemyProvider } from '../provider';
import { SBT_PLATFORM, TESNET_GOERLI } from '../constants';
import { getWallet } from '../wallet';

export const getContractInstance = (address: string) => {
  return new ethers.Contract(address, abi, alchemyProvider);
};

/**
 * Returns an instance of the SBT contract from the authentication platform
 */
export const getContractWithSigner = () => {
  const wallet = getWallet();
  const contractWithSigner = new ethers.Contract(SBT_PLATFORM.address, abi, wallet);
  return contractWithSigner;
};

export const mintSBT = async (to: string) => {
  const contractWithSigner = getContractWithSigner();
  // It has not been defined what metadata each user will have, for now the URI will be the same as the transaction counter.
  const counter = alchemyProvider.getTransactionCount(SBT_PLATFORM.address);
  const tx = await contractWithSigner.safeMint(to, counter);
  await tx.wait();
};

export const getPlatformSbtFromUser = async (walletAddress: string): Promise<SbtDto[]> => {
  const token: Token = {
    _id: '',
    address: SBT_PLATFORM.address,
    name: SBT_PLATFORM.name,
    network_name: TESNET_GOERLI,
  };
  const sbts = await getSbtsFromUser([token], walletAddress);
  return sbts;
};

export const getSbtsFromUser = async (tokens: Token[], walletAddress: string): Promise<SbtDto[]> => {
  const mySbts: SbtDto[] = [];

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
      mySbts.push(sbt);
    }
  }
  return mySbts;
};
