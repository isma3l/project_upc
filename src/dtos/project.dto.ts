import { TokenDto } from './token.dto';

export class ProjectDto {
  public id: string;
  public name: string;
  public description?: string;
  public apiKey: string;
  public tokens: TokenDto[];

  constructor(id: string, name: string, apikey: string, description?: string, tokens: TokenDto[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.apiKey = apikey;
    this.tokens = tokens;
  }
}
