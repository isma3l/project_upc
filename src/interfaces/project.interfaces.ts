import { Types } from 'mongoose';
import { Token } from './token.interfaces';

export interface Project {
  _id: string;
  user_id: string;
  api_key: string;
  name: string;
  description?: string;
  tokens: Types.Array<Token>;
}
