import { IComment } from "./components/comments/interfaces";
import { IProject } from "./components/projects/interfaces";
import { IProjectStatus } from "./components/projectStatuses/interfaces";
import { IUser, } from "./components/users/interfaces";

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan',
    },
];

const projects: IProject[] = [
    {
        id: 1,
        title: 'Esimene projekt',
        content: 'Esimese projekti sisu',
        userId: 2,
        statusId: 7,
    },
    {
        id: 2,
        title: 'Teine projekt',
        content: 'Teise projekti sisu',
        userId: 1,
        statusId: 2,
    },
];

const projectStatuses: IProjectStatus[] = [
    {
        id: 1,
        status: 'Draft',
    },
    {
        id: 2,
        status: 'Public',
    },
    {
        id: 3,
        status: 'Private',
    },
];

const comments: IComment[] = [
    {
        id: 1,
        userId: 1,
        projectId: 1,
        content: 'Esimese projekti esimene kommentaar', 
    },
    {
        id: 2,
        userId: 1,
        projectId: 2,
        content: 'Teise projekti esimene kommentaar', 
    },
    {
        id: 3,
        userId: 1,
        projectId: 2,
        content: 'Teise projekti teine kommentaar', 
    },
]

export { users, projects, projectStatuses, comments };