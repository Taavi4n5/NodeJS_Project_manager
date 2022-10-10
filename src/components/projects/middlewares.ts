import { Request, Response, NextFunction } from "express";

const projectsMiddlewares = {
    checkCreateProject: (req: Request, res: Response, next: NextFunction) => {
        const { title, content, userId, statusId } = req.body;
        if (!title || !content || !userId || !statusId) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (title, content, userId, statusId)`,
            });
        };
        next();
    }
};

export default projectsMiddlewares;