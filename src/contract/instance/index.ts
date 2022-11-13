import { ethers } from 'ethers';

import abi from '../abi';
import { alchemyProvider } from '../provider';

const getContractInstance = (address: string) => {
  const contractInstance = new ethers.Contract(address, abi, alchemyProvider);
  return contractInstance;
};

export default getContractInstance;
