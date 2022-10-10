import { Request, Response } from "express";
import { INewComment } from "./interfaces";
import commentsServices from "./services";

const commentsControllers = {
    getAllComments: (req: Request, res: Response) => {
        const commentWithUsers = commentsServices.getAllComments();

        res.status(200).json({
            success: true,
            message: 'List of all comments',
            comments: commentWithUsers,
        });
    },
    getCommentsById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comment = commentsServices.getCommentById(id);
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
    },
    createComment: (req: Request, res: Response) => {
        const { projectId, content } = req.body;
        let { userId } = req.body;
        if (!projectId || !content) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (projectId, content)`,
            });
        }
        if (!userId) userId = null;
        const newComment: INewComment = {
            userId,
            projectId,
            content,
        };
        const id: number = commentsServices.createComment(newComment);
        return res.status(201).json({
            success: true,
            message: `comment with id ${id} created`,
        });
    },
    deleteComment: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = commentsServices.deleteComments(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Comment not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Comment deleted`,
        });
    }
};


export default commentsControllers;