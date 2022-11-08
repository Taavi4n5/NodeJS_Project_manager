import { Request, Response } from "express";
import { IComment } from "./interfaces";
import commentsServices from "./services";

const commentsControllers = {
    getAllComments: async (req: Request, res: Response) => {
        const comments = await commentsServices.getAllComments();
    
        res.status(200).json({
          success: true,
          message: 'List of all comments',
          comments,
        });
    },
    getCommentsById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const comment = await commentsServices.getCommentById(id);
        if (!comment) {
          return res.status(404).json({
            success: false,
            message: 'Comment not found',
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Comment',
          data: {
            comment,
          },
        });
    },
    createComment: async (req: Request, res: Response) => {
        const { projectId, content } = req.body;
        let { userId } = req.body;
        if (!projectId || !content) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (projectId, content)`,
            });
        }
        if (!userId) userId = null;
        const newComment: IComment = {
            userId,
            projectId,
            content,
        };
        const id: number = await commentsServices.createComment(newComment);
        return res.status(201).json({
            success: true,
            message: `comment with id ${id} created`,
        });
    },
    deleteComment: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
    const result = await commentsServices.deleteComments(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Could not find the comment',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
    }
};


export default commentsControllers;