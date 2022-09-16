import { StatusCodes } from 'http-status-codes';

import { CreateUserDto, UserDto } from '@dtos';
import { AuthService } from '@services';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  authService: AuthService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: UserDto = await this.authService.signup(userData);

      res.status(StatusCodes.CREATED).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { accessToken } = await this.authService.login(userData);

      res.status(StatusCodes.OK).json({ accessToken, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}
