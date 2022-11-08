import { RowDataPacket } from 'mysql2';

interface IComment {
    id?: number;
    userId: number;
    projectId: number;
    content: string;
}

interface ICommentSQL extends IComment, RowDataPacket {}

export { IComment, ICommentSQL };