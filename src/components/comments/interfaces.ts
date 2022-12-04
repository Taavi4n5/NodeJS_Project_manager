import { RowDataPacket } from 'mysql2';

interface IComment {
    id?: number;
    content: string;
    projectId: number;
    userId: number;
}

interface ICommentSQL extends IComment, RowDataPacket {}

export { IComment, ICommentSQL };