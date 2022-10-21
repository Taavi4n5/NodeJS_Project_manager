import express from 'express';
import commentsController from './controllers';
const commentsRoutes = express.Router();

commentsRoutes
    .get('/', commentsController.getAllComments)
    .get('/:id', commentsController.getCommentsById)
    .post('/', commentsController.createComment)
    .delete('/:id', commentsController.deleteComment);

export default commentsRoutes;