import { ProjectDto } from '@/dtos';
import { Project } from '@/interfaces';

export class ProjectDtoMapper {
  static map(project: Project): ProjectDto {
    const { _id, name, api_key, description } = project;
    return new ProjectDto(_id, name, api_key, description);
  }
}
