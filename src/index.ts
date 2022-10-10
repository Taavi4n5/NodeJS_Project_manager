import express, { Request, Response } from 'express';
import { IComment } from './components/comments/interfaces';
import { IProject } from './components/projects/interfaces';
import { IProjectStatus } from './components/projectStatuses/interfaces';
import { INewUserWithPassword, IUserWithoutPassword, IUser } from './components/users/interfaces';
import { users, projectStatuses, projects, comments } from './mockData';
const app = express();
const PORT = 3000;

app.use(express.json());






// Kontroll serveri toimimise kohta
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'It works!',
    });
});

/* Kasutaja */


// Kõikide kasutajate pärimine
app.get('/api/v1/users', (req: Request, res: Response) => {
    const usersWithoutPassword = users.map(user => {
        const userWithoutPassword = getUserWithoutPassword(user);
        return userWithoutPassword;
    });
    res.status(200).json({
        success: true,
        message: 'List of users',
        users: usersWithoutPassword,
    });
});

// Kasutaja pärimine id kaudu
app.get('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let user: IUserWithoutPassword | undefined = findUserById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    const userWithoutPassword = getUserWithoutPassword(user);

    return res.status(200).json({
        success: true,
        message: `User`,
        data: {
            user: userWithoutPassword
        },
    });
});

// Kasutaja muutmine
app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password } = req.body;
    const user: IUserWithoutPassword | undefined = findUserById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    return res.status(200).json({
        success: true,
        message: `User updated`,
    });
});

// Kasutaja loomine
app.post('/api/v1/users', (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (firstName, lastName, email, password)`,
        });
    }
    const id = users.length + 1;
    const newUser: IUser = {
        id,
        firstName,
        lastName,
        email,
        password
    };
    users.push(newUser);

    return res.status(201).json({
        success: true,
        message: `User with id ${newUser.id} created`,
    });
});

// Kasutaja kustutamine
app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    users.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `User deleted`,
    });
});

/* Projektid */

// Projekti loomine
app.get('/api/v1/projects/statuses', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of project statuses',
        projectStatuses,
    });
});

// projekti staatus pärimine staatuse id alusel
app.get('/api/v1/projects/statuses/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const projectStatus = projectStatuses.find(element => {
        return element.id === id;
    });
    if (!projectStatus) {
        return res.status(404).json({
            success: false,
            message: `project status not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `project status`,
        data: {
            projectStatus,
        },
    });
});

// Kõikide projektide pärimine
app.get('/api/v1/projects', (req: Request, res: Response) => {
    const projectsWithStatusesAndUsers = projects.map(project => {
        const projectWithStatusAndUser = getProjectWithStatusAndUser(project);
        return projectWithStatusAndUser;
    });
    res.status(200).json({
        success: true,
        message: 'List of projects',
        projects: projectsWithStatusesAndUsers,
    });
});

// Projektide pärimine id kaudu
app.get('/api/v1/projects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const project = findProjectById(id);
    if (!project) {
        return res.status(404).json({
            success: false,
            message: `project not found`,
        });
    };

    const projectWithStatusAndUser = getProjectWithStatusAndUser(project);
    return res.status(200).json({
        success: true,
        message: `project`,
        data: {
            project: projectWithStatusAndUser,
        },
    });
});

// projekti loomine
app.post('/api/v1/projects', (req: Request, res: Response) => {
    const { title, content, userId, statusId } = req.body;
    if (!title || !content || !userId || !statusId) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (title, content, userId, statusId)`,
        });
    }
    const id = projects.length + 1;
    const newproject: IProject = {
        id,
        title,
        content,
        userId,
        statusId,
    };
    projects.push(newproject);

    return res.status(201).json({
        success: true,
        message: `project with id ${newproject.id} created`,
    });
});

// projekti muutmine
app.patch('/api/v1/projects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content, statusId } = req.body;
    const project = projects.find(element => {
        return element.id === id;
    });
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

    if (title) project.title = title;
    if (content) project.content = content;
    if (statusId) project.statusId = statusId;

    return res.status(200).json({
        success: true,
        message: `project updated`,
    });
});

// projekti kustutamine
app.delete('/api/v1/projects/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = projects.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `project not found`,
        });
    }
    projects.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `project deleted`,
    });
});

/* Kommentaarid */

// Kõikide kommentaaride pärimine
app.get('/api/v1/comments', (req: Request, res: Response) => {
    const commentsWithUsers = comments.map(comment => {
        let user: IUserWithoutPassword | undefined = findUserById(comment.id);
        if (!user) user = unknownUser();
        const userWithoutPassword = getUserWithoutPassword(user);
        const commentWithUser = {
            id: comment.id,
            content: comment.content,
            user: userWithoutPassword,
        };
        return commentWithUser;
    });

    res.status(200).json({
        success: true,
        message: 'List of all comments',
        comments: commentsWithUsers,
    });
});

// Kommentaari pärimine id kaudu
app.get('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = getCommentById(id);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: `Comment not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Comment`,
        data: {
            comment,
        },
    });
});

// projektiga seotud kommentaaride pärimise endpoint
app.get('/api/v1/projects/:id/comments', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comments = findCommentsByProjectId(id);
    return res.status(200).json({
        success: true,
        message: `Comments of project with id: ${id}`,
        data: {
            comments,
        },
    });
});

// Kommentaari loomine
app.post('/api/v1/comments', (req: Request, res: Response) => {
    const { projectId, content } = req.body;
    let { userId } = req.body;
    if (!projectId || !content) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (projectId, content)`,
        });
    }
    if (!userId) userId = null;
    const id = comments.length + 1;
    const comment: IComment = {
        id,
        userId,
        projectId,
        content,
    };
    comments.push(comment);

    return res.status(201).json({
        success: true,
        message: `comment with id ${comment.id} created`,
    });
});

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Comment not found`,
        });
    }
    comments.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Comment deleted`,
    });
});


/* Kasutaja funktsioonid */

const findUserById = (id: number): IUserWithoutPassword | undefined => {
    let user: IUserWithoutPassword | undefined = users.find(element => element.id === id);
    return user;
};

const getUserWithoutPassword = (user: IUserWithoutPassword): IUserWithoutPassword => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
};

const unknownUser = (): IUser => {
    return {
            id: 0,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@doe.com',
            password: 'jane',
        };
};

/* Projektide funktsioonid */

const findProjectById = (id: number): IProject | undefined => {
    const project = projects.find(element => {
        return element.id === id;
    });
    return project;
};

const getProjectWithStatusAndUser = (project: IProject) => {
    const projectStatus = getProjectStatusById(project.statusId);
    let user: IUserWithoutPassword | undefined = findUserById(project.userId);
    if (!user) user = unknownUser();
    const userWithoutPassword = getUserWithoutPassword(user);

    const projectWithStatusAndUser = {
        id: project.id,
        title: project.title,
        user: userWithoutPassword,
        status: projectStatus,
    };
    return projectWithStatusAndUser;
};

const getProjectStatusById = (id: number): IProjectStatus | undefined => {
    let projectStatus: IProjectStatus | undefined = projectStatuses.find(element => element.id === id);
    if(!projectStatus) {
        projectStatus = {
            id: 0,
            status: 'Unknown',
        };
    };
    return projectStatus;
}
/* Kommentaaride funktsioonid */
const getCommentById = (id: number): IComment | undefined => {
    const comment = comments.find(element => {
        return element.id === id;
    });
    return comment;
};

const findCommentsByProjectId = (id: number): IComment[] => {
    const projectComments = comments.filter(comment => comment.projectId === id);
    return projectComments;
}

app.listen(PORT, () => {
    console.log('Server is running');
});