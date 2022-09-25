import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @Matches(/^[A-Za-z][A-Za-z0-9_-]{3,30}$/)
  public name: string;

  @IsOptional()
  @IsString()
  public description: string;
}
