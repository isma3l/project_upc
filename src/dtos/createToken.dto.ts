import { IsString } from 'class-validator';

export class CreateTokentDto {
  @IsString()
  public address: string;

  @IsString()
  public name: string;

  @IsString()
  public network_name: string;
}

export type updateTokenDto = CreateTokentDto;
