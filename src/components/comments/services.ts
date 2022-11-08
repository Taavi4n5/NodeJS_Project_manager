import { IComment, ICommentSQL } from './interfaces';
import pool from '../../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';


const commentsServices = {
    getAllComments: async  (): Promise<ICommentSQL> => {
        const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(`SELECT comments.id, comments.dateCreated, users.id AS userId, users.firstName, users.lastName FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.dateDeleted IS NULL;`);
        return comments[0];
    },
    getCommentById: async (id: number): Promise<ICommentSQL> => {
        const [comment]: [ICommentSQL[], FieldPacket[]] = await pool.query(`SELECT comments.id, comments.content, comments.dateCreated, users.id AS userId, users.firstName, users.lastName FROM comments INNER JOIN users  ON comments.users_id = users.id WHERE comments.id = ? AND comments.dateDeleted IS NULL;`, [id]);
          return comment[0];
    },
    findCommentsByProjectId: async (id: number): Promise<ICommentSQL[]> => {
        const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(`SELECT comments.id, comments.content, comments.dateCreated, users.id AS userId, users.firstName, users.lastName FROM comments INNER JOIN users ON comments.userId = users.id WHERE comments.projects_id = ? AND comments.dateDeleted IS NULL;`, [id]);
        return comments;
    },
    createComment: async  (newComment: IComment): Promise<number> => {
        const comment: IComment = {
          ...newComment,
        };
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO comments SET ?;', [comment]);
        return result.insertId;
    },
    deleteComments: async (id: number): Promise<Boolean> => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE comments SET deletedDate = ? WHERE id = ?;', [Date.now(), id]);
        if (result.affectedRows < 1) {
          return false;
        }
        return true;
    },
}

export default commentsServices;