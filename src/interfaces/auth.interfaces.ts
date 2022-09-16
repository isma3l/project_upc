import { Request } from 'express';
import { User } from '@interfaces';

export interface PayloadToken {
  _id: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
