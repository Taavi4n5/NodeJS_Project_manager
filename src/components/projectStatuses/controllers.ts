import { Request, Response } from "express";
import projectStatusesServices from "../projectStatuses/services";
import { IProjectStatus } from "./interfaces";

const projectStatusesControllers = {
    getAllProjectStatuses: (req: Request, res: Response) => {
        const projectStatuses: IProjectStatus[] = projectStatusesServices.getAllPostStatuses();
        res.status(200).json({
            success: true,
            message: 'List of project statuses',
            projectStatuses,
        });
    },
    getProjectStatusById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const projectStatus = projectStatusesServices.getProjectStatusById(id);
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
    },

};

export default projectStatusesControllers;