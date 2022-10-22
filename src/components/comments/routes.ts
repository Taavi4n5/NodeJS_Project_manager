import express from 'express';
import authMiddleware from '../auth/middlewares';
import commentsController from './controllers';
const commentsRoutes = express.Router();

commentsRoutes
    .get('/', commentsController.getAllComments)
    .get('/:id', commentsController.getCommentsById)
    .post('/',authMiddleware.isLoggedIn, commentsController.createComment)
    .delete('/:id',authMiddleware.isLoggedIn, commentsController.deleteComment);

export default commentsRoutes;