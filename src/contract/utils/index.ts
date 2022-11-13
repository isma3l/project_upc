import { ethers } from 'ethers';

export const isAddress = (address: string) => ethers.utils.isAddress(address);
