import { projectStatuses } from "../../mockData";
import { IProjectStatus } from "./interfaces";

const projectStatusesServices = {
        getAllPostStatuses: (): IProjectStatus[] => {
            return projectStatuses;
        },
    getProjectStatusById: (id: number): IProjectStatus | undefined => {
        let projectStatus: IProjectStatus | undefined = projectStatuses.find(element => element.id === id);
        if(!projectStatus) {
            projectStatus = {
                id: 0,
                status: 'Unknown',
            };
        };
        return projectStatus;
    },
}

export default projectStatusesServices;