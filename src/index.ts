import express, { Request, Response } from 'express';
import usersControllers from './components/users/controllers';
import projectStatusesControllers from './components/projectStatuses/controllers';
import projectsControllers from './components/projects/controllers';
import commentsControllers from './components/comments/controllers';

const app = express();
const PORT = 3000;

app.use(express.json());

// Kontroll serveri toimimise kohta
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'It works!',
    });
});

// Kõikide kasutajate pärimine
app.get('/api/v1/users', usersControllers.getAllUsers);

// Kasutaja pärimine id kaudu
app.get('/api/v1/users/:id', usersControllers.getUserById);

// Kasutaja muutmine
app.patch('/api/v1/users/:id', usersControllers.updateUser);

// Kasutaja loomine
app.post('/api/v1/users', usersControllers.createUser);

// Kasutaja kustutamine
app.delete('/api/v1/users/:id', usersControllers.deleteUser);

// Projekti loomine
app.get('/api/v1/projects/statuses', projectStatusesControllers.getAllProjectStatuses);

// projekti staatus pärimine staatuse id alusel
app.get('/api/v1/projects/statuses/:id', projectStatusesControllers.getProjectStatusById);

// Kõikide projektide pärimine
app.get('/api/v1/projects', projectsControllers.getAllProjects);

// Projektide pärimine id kaudu
app.get('/api/v1/projects/:id', projectsControllers.getProjectById);

// projekti loomine
app.post('/api/v1/projects', projectsControllers.createProject);

// projekti muutmine
app.patch('/api/v1/projects/:id', projectsControllers.updateProject);

// projekti kustutamine
app.delete('/api/v1/projects/:id', projectsControllers.deleteProject);

// Kõikide kommentaaride pärimine
app.get('/api/v1/comments', commentsControllers.getAllComments);

// Kommentaari pärimine id kaudu
app.get('/api/v1/comments/:id', commentsControllers.getCommentsById);

// projektiga seotud kommentaaride pärimise endpoint
app.get('/api/v1/projects/:id/comments', projectsControllers.getCommentsByProjectId);

// Kommentaari loomine
app.post('/api/v1/comments', commentsControllers.createComment);

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', commentsControllers.deleteComment);

app.listen(PORT, () => {
    console.log('Server is running');
});