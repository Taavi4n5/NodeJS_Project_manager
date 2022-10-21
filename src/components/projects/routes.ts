import express from 'express';
import projectsControllers from './controllers';
const projectsRoutes = express.Router();

projectsRoutes
    .get('/', projectsControllers.getAllProjects)
    .get('/:id', projectsControllers.getProjectById)
    .get('/:id/comments', projectsControllers.getCommentsByProjectId)
    .post('/', projectsControllers.createProject)
    .patch('/:id', projectsControllers.updateProject)
    .delete('/:id', projectsControllers.deleteProject);

export default projectsRoutes;