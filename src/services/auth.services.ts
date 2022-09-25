import { StatusCodes } from 'http-status-codes';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { SECRET_KEY } from '@config';
import { PayloadToken, User } from '@interfaces';
import { CreateUserDto } from '@dtos';
import { userModel } from '@models';
import { HttpException } from '@exceptions';

export class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<{ accessToken: string }> {
    const userFound: User | null = await this.users.findOne({ email: userData.email });
    if (userFound) throw new HttpException(StatusCodes.CONFLICT, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    const accessToken = this.createAccessToken(createUserData);
    return { accessToken };
  }

  public async login(userData: CreateUserDto): Promise<{ accessToken: string }> {
    const userFound: User | null = await this.users.findOne({ email: userData.email });
    if (!userFound) throw new HttpException(StatusCodes.NOT_FOUND, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, userFound.password);
    if (!isPasswordMatching) throw new HttpException(StatusCodes.UNAUTHORIZED, 'Password is not matching');

    const accessToken = this.createAccessToken(userFound);
    return { accessToken };
  }

  private createAccessToken(user: User): string {
    const secretKey: string = SECRET_KEY as string;
    const payloadToken: PayloadToken = { _id: user._id };
    return sign(payloadToken, secretKey, { expiresIn: '30d' });
  }
}
