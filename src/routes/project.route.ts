import { Router } from 'express';

import { Routes } from '@/interfaces';
import { authMiddleware, validationMiddleware } from '@middlewares';
import { ProjectController } from '@controllers';
import { CreateProjectDto, UpdateProjectDto } from '@/dtos';

class ProjectRoute implements Routes {
  public path = '/projects';
  public router: Router = Router();
  private projectController: ProjectController = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, authMiddleware, validationMiddleware(CreateProjectDto), this.projectController.createProject);
    this.router.get(this.path, authMiddleware, this.projectController.getAllProjects);
    this.router.get(`${this.path}/:id`, authMiddleware, this.projectController.getProjectById);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.projectController.deleteProjectById);
    this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(UpdateProjectDto), this.projectController.modifyProject);
  }
}

export default ProjectRoute;
