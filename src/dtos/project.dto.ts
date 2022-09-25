export class ProjectDto {
  public id: string;
  public name: string;
  public description?: string;
  public apiKey: string;

  constructor(id: string, name: string, apikey: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.apiKey = apikey;
  }
}
