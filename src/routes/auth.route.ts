import { Router } from 'express';
import { AuthController } from '@controllers';
import { validationMiddleware } from '@middlewares';
import { CreateUserDto } from '@dtos';
import { Routes } from '@interfaces';

class AuthRoute implements Routes {
  public path = '/';
  router: Router = Router();
  public authController: AuthController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto), this.authController.logIn);
  }
}

export default AuthRoute;
