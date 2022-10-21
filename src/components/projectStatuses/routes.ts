import express from 'express';
import projectStatusesController from './controllers';
const projectStatusesRoutes = express.Router();

projectStatusesRoutes
    .get('/', projectStatusesController.getAllProjectStatuses)
    .get('/:id', projectStatusesController.getProjectStatusById);

export default projectStatusesRoutes;