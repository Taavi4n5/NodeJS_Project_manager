import { RowDataPacket } from 'mysql2';

interface IProject {
    id?: number;
    userId?: number;
    title?: string;
    content?: string;
    statusId?: number;
}

interface IProjectSQL extends IProject, RowDataPacket {}

export { IProject, IProjectSQL };