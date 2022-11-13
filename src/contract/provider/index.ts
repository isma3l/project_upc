import { API_KEY_ALCHEMY } from '@config';
import { ethers } from 'ethers';
import { TESNET_GOERLI } from '../constants';

// Being the first test version it operates only on the tesnet goerli
export const alchemyProvider = new ethers.providers.AlchemyProvider(TESNET_GOERLI, API_KEY_ALCHEMY);
