import express, { Request, Response } from 'express';
import commentsRoutes from './components/comments/routes';
import projectsRoutes from './components/projects/routes';
import usersRoutes from './components/users/routes';
import generalRoutes from './components/general/routes';
import projectStatusesRoutes from './components/projectStatuses/routes';
import authController from './components/auth/controllers';
import authMiddleware from './components/auth/middlewares';

const app = express();
const PORT = 3000;
const path = '/api/v1';

app.use(express.json());

app.use(`${path}/health`, generalRoutes); //Serveri toimimise kontroll
app.post(`${path}/login`, authController.login);
app.use(`${path}/users`, usersRoutes); // kasutaja
app.use(`${path}/projectStatuses`, projectStatusesRoutes); // Projektistaatus
app.use(`${path}/comments`, commentsRoutes); // kommentaarid
app.use(`${path}/projects`, projectsRoutes); // projektid
app.use(authMiddleware.isLoggedIn); // token kontroll

app.listen(PORT, () => {
    console.log('Server is running');
});