import { StatusCodes } from 'http-status-codes';
import Crypto from 'crypto';

import { HttpException } from '@/exceptions';
import { Project, User } from '@/interfaces';
import { ProjectDtoMapper } from '@dtoMappers';
import { projectModel } from '@/models';
import { ProjectDto, CreateProjectDto, UpdateProjectDto } from '@/dtos';

const DEFAULT_API_KEY_SIZE = 30;

export class ProjectService {
  public projects = projectModel;

  public async createProject(projectData: CreateProjectDto, user_id?: string): Promise<ProjectDto> {
    const userProjects = await this.projects.find({ user_id });

    const projectFound = userProjects.find(project => project.name === projectData.name);
    if (projectFound) throw new HttpException(StatusCodes.CONFLICT, 'the user already has a project with that name');

    const api_key = this.createApiKey();
    const createdProjectData: Project = await this.projects.create({ ...projectData, user_id, api_key });

    return ProjectDtoMapper.map(createdProjectData);
  }

  private createApiKey(size = DEFAULT_API_KEY_SIZE): string {
    return Crypto.randomBytes(size).toString('base64').slice(0, size);
  }

  public async getProjectById(projectId: string): Promise<ProjectDto> {
    console.log('projectId: ', projectId);
    const projectFound = await this.projects.findById(projectId);
    console.log('projectFound: ', projectFound);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, `This project with id ${projectId} was not found`);

    return ProjectDtoMapper.map(projectFound);
  }

  public async getAllProjects(user_id?: string): Promise<ProjectDto[]> {
    const projects = await this.projects.find({ user_id });
    return projects.map(project => ProjectDtoMapper.map(project));
  }

  public async deleteProjectById(projectId: string): Promise<ProjectDto> {
    const deleteUserById = await this.projects.findByIdAndDelete(projectId);
    if (!deleteUserById) throw new HttpException(StatusCodes.NOT_FOUND, 'Project does not exist');

    return ProjectDtoMapper.map(deleteUserById);
  }

  public async modifyProject(projectId: string, projectData: UpdateProjectDto, user_id?: string): Promise<ProjectDto> {
    const projectFound = await this.projects.findById(projectId);
    if (!projectFound) throw new HttpException(StatusCodes.NOT_FOUND, 'Project does not exist');

    const userProjects = await this.projects.find({ user_id });

    const duplicatedProject = userProjects.find(project => project.name === projectData.name);
    if (duplicatedProject) throw new HttpException(StatusCodes.CONFLICT, 'A project with the same name exists');

    const updateProjectById = await this.projects.findByIdAndUpdate(projectId, projectData);
    console.log('resultado: ', updateProjectById);
    if (!updateProjectById) throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, 'An error occurred while updating the project');

    return ProjectDtoMapper.map(updateProjectById);
  }
}
