import { Request, Response } from 'express';
import commentsServices from '../comments/services';
import { IProject, IProjectSQL } from './interfaces';
import projectsServices from './services';

const projectsControllers = {
    getAllProjects: async (req: Request, res: Response) => {
        const projectsWithStatusesAndUsers = await projectsServices.getAllProjects();
        res.status(200).json({
          success: true,
          message: 'Project list',
          projects: projectsWithStatusesAndUsers,
        });
    },
    getProjectById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const project = await projectsServices.findProjectById(id);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: 'Project not found',
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Project',
          data: {
            project,
          },
        });
    },
    createProject: async (req: Request, res: Response) => {
        const {title, content, statusId} = req.body;
        const userId = res.locals.user?.id;
        if (!title || !content || !statusId) {
          return res.status(400).json({
            success: false,
            message: 'Some data is missing (title, content, userId, statusId)',
          });
        }
        const newProject: IProject = {
          title,
          content,
          statusId,
          userId,
        };
        const id = await projectsServices.createProject(newProject);
        return res.status(201).json({
          success: true,
          message: `Project with id ${id} created`,
        });
    },
    updateProject: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const {title, content, statusId} = req.body;
        const project = await projectsServices.findProjectById(id);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: 'Project not found',
          });
        }
        if (!title && !content && !statusId) {
          return res.status(400).json({
            success: false,
            message: 'Nothing to change',
          });
        }
        const projectToUpdate: IProject = {
          id,
          title,
          content,
          statusId,
        };
    
        await projectsServices.updateProject(projectToUpdate);
    
        return res.status(200).json({
          success: true,
          message: 'Project updated',
        });
    },
    deleteProject: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const result = await projectsServices.deleteProject(id);
        if (!result) {
          return res.status(404).json({
            success: false,
            message: 'Project not found',
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Project deleted',
        });
    },
    getCommentsByProjectId: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const comments = await commentsServices.findCommentsByProjectId(id);
        return res.status(200).json({
          success: true,
          message: `Comments of project with id: ${id}`,
          data: {
            comments,
          },
        });
    },
}

export default projectsControllers;