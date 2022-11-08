import { Request, Response } from "express";
import projectStatusesServices from "../projectStatuses/services";
import { IProjectStatus } from "./interfaces";

const projectStatusesControllers = {
    getAllProjectStatuses: async (req: Request, res: Response) => {
        const projectStatuses: IProjectStatus[] = await projectStatusesServices.getAllProjectStatuses();
        res.status(200).json({
            success: true,
            message: 'Project status',
            projectStatuses,
        });
    },
    getProjectStatusById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const projectStatus = projectStatusesServices.getProjectStatusById(id);
        if (!projectStatus) {
            return res.status(404).json({
                success: false,
                message: `Could not find project status`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Project status`,
            data: {
                projectStatus,
            },
        });
    },

};

export default projectStatusesControllers;