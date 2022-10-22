import express from 'express';
import authMiddleware from '../auth/middlewares';
import projectsControllers from './controllers';
const projectsRoutes = express.Router();

projectsRoutes
    .get('/', projectsControllers.getAllProjects)
    .get('/:id', projectsControllers.getProjectById)
    .get('/:id/comments', projectsControllers.getCommentsByProjectId)
    .post('/', authMiddleware.isLoggedIn, projectsControllers.createProject)
    .patch('/:id', authMiddleware.isLoggedIn, projectsControllers.updateProject)
    .delete('/:id', authMiddleware.isLoggedIn ,projectsControllers.deleteProject);

export default projectsRoutes;