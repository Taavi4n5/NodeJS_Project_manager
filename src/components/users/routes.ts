import express from 'express';
import authMiddleware from '../auth/middlewares';
import usersControllers from './controllers';
import usersMiddlewares from './middlewares';
const usersRoutes = express.Router();

usersRoutes
    .get('/', authMiddleware.isLoggedIn, usersControllers.getAllUsers)
    .get('/:id', authMiddleware.isLoggedIn, usersControllers.getUserById)
    .post('/', usersMiddlewares.checkCreateUserData, usersControllers.createUser)
    .patch('/:id', authMiddleware.isLoggedIn, usersControllers.updateUser)
    .delete('/:id', authMiddleware.isLoggedIn, usersControllers.deleteUser);

export default usersRoutes;