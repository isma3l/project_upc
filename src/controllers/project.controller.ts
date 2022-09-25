import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ProjectService } from '@services';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@dtos';
import { RequestWithUser } from '@interfaces';

export class ProjectController {
  projectService: ProjectService = new ProjectService();

  public createProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const projectData: CreateProjectDto = req.body;
      const userId = req.user?._id;
      const createdProjectData: ProjectDto = await this.projectService.createProject(projectData, userId);

      res.status(StatusCodes.CREATED).json(createdProjectData);
    } catch (error) {
      next(error);
    }
  };

  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.id;
      const projectData: ProjectDto = await this.projectService.getProjectById(projectId);

      res.status(StatusCodes.OK).json(projectData);
    } catch (error) {
      next(error);
    }
  };

  public getAllProjects = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const projects: ProjectDto[] = await this.projectService.getAllProjects(userId);

      res.status(StatusCodes.OK).json({ projects });
    } catch (error) {
      next(error);
    }
  };

  public deleteProjectById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const projectId = req.params.id;
      const deletedProject: ProjectDto = await this.projectService.deleteProjectById(projectId);

      res.status(StatusCodes.OK).json(deletedProject);
    } catch (error) {
      next(error);
    }
  };

  public modifyProject = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const projectId = req.params.id;
      const projectData: UpdateProjectDto = req.body;
      const modifiedProject = await this.projectService.modifyProject(projectId, projectData, userId);

      res.status(StatusCodes.OK).json(modifiedProject);
    } catch (error) {
      next(error);
    }
  };
}
