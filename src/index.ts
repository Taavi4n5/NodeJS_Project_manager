import express, { Request, Response } from 'express';
import commentsRoutes from './components/comments/routes';
import projectsRoutes from './components/projects/routes';
import usersRoutes from './components/users/routes';
import generalRoutes from './components/general/routes';
import projectStatusesRoutes from './components/projectStatuses/routes';

const app = express();
const PORT = 3000;
const path = '/api/v1';

app.use(express.json());

app.use(`${path}`, generalRoutes); //Serveri toimimise kontroll
app.use(`${path}`, usersRoutes); // kasutaja
app.use(`${path}`, projectStatusesRoutes); // Projektistaatus
app.use(`${path}`, commentsRoutes); // kommentaarid
app.use(`${path}`, projectsRoutes); // projektid

app.listen(PORT, () => {
    console.log('Server is running');
});