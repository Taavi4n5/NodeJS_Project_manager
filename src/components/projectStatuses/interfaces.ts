import { RowDataPacket } from 'mysql2';

interface IProjectStatus {
    id?: number;
    status: string;
}

interface IProjectStatusSQL extends IProjectStatus, RowDataPacket {}

export { IProjectStatus, IProjectStatusSQL };