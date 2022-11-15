import { ethers } from 'ethers';

import { alchemyProvider } from '../provider';
import { WALLET_SECRET_KEY } from '@config';

export const getWallet = (): ethers.Wallet => {
  return new ethers.Wallet(WALLET_SECRET_KEY as string, alchemyProvider);
};
