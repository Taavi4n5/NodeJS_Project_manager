import { Request, Response } from "express";
import commentsServices from "../comments/services";
import { INewProject, IProjectToUpdate } from "./interfaces";
import projectsServices from "./services";

const projectsControllers = {
    getAllProjects: (req: Request, res: Response) => {
        const projectsWithStatusesAndUsers = projectsServices.getAllProjects();
        res.status(200).json({
            success: true,
            message: 'List of projects',
            projects: projectsWithStatusesAndUsers,
        });
    },
    getProjectById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const project = projectsServices.findProjectById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: `project not found`,
            });
        };
    
        const projectWithStatusAndUser = projectsServices.getProjectWithStatusAndUser(project);
        return res.status(200).json({
            success: true,
            message: `project`,
            data: {
                project: projectWithStatusAndUser,
            },
        });
    },
    createProject: (req: Request, res: Response) => {
        const { title, content, userId, statusId } = req.body;
        const newProject: INewProject = {
            title,
            content,
            userId,
            statusId,
        };
        const id: number = projectsServices.createProject(newProject);
    
        return res.status(201).json({
            success: true,
            message: `project with id ${id} created`,
        });
    },
    updateProject: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { title, content, statusId } = req.body;
        const project = projectsServices.findProjectById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: `project not found`,
            });
        }
        if (!title && !content && !statusId) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }
        const projectToUpdate: IProjectToUpdate = {
            id,
            title,
            content,
            statusId,
        };

        projectsServices.updateProject(projectToUpdate);
    
        if (title) project.title = title;
        if (content) project.content = content;
        if (statusId) project.statusId = statusId;
    
        return res.status(200).json({
            success: true,
            message: `project updated`,
        });
    },
    deleteProject: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = projectsServices.deleteProject(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `project not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `project deleted`,
        });
    },
    getCommentsByProjectId: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comments = commentsServices.findCommentsByProjectId(id);
        return res.status(200).json({
            success: true,
            message: `Comments of project with id: ${id}`,
            data: {
                comments,
            },
        });
    }
}

export default projectsControllers;