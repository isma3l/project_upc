import { NextFunction, Response, Request, RequestHandler } from 'express';

import { SECRET_KEY } from '@config';
import { verify } from 'jsonwebtoken';
import { PayloadToken, User } from '@/interfaces';
import { userModel } from '@models';
import { RequestWithUser } from '@interfaces';
import { HttpException } from '@exceptions';
import { StatusCodes } from 'http-status-codes';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers['authorization'] as string;
    const accessToken = authorizationHeader ? authorizationHeader.split('Bearer ')[1] : null;

    if (accessToken) {
      const verificationResponse = (await verify(accessToken, SECRET_KEY as string)) as PayloadToken;
      const userId = verificationResponse._id;
      const user: User | null = await userModel.findById(userId);

      if (user) {
        req.user = user;
        next();
      } else {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(StatusCodes.NOT_FOUND, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(StatusCodes.UNAUTHORIZED, 'Wrong authentication token'));
  }
};

export const authMiddleware2 = (): RequestHandler => {
  return async (req, res, next) => {
    next();
  };
};
