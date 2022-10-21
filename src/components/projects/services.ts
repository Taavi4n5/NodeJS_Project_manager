import { projects } from "../../mockData";
import projectStatusesServices from "../projectStatuses/services";
import { IUser, IUserWithoutPassword } from "../users/interfaces";
import usersServices from "../users/services";
import { INewProject, IProject, IProjectToUpdate } from "./interfaces";

const projectsServices = {
    getAllProjects: () => {
        const projectsWithStatusesAndUsers = projects.map(project => {
            const projectWithStatusAndUser = projectsServices.getProjectWithStatusAndUser(project);
            return projectWithStatusAndUser;
        });
        return projectsWithStatusesAndUsers;
    },
    findProjectById: (id: number): IProject | undefined => {
        const project = projects.find(element => {
            return element.id === id;
        });
        return project;
    },
    getProjectWithStatusAndUser: (project: IProject) => {
        const projectStatus = projectStatusesServices.getProjectStatusById(project.statusId);
        let user: IUser | undefined = usersServices.findUserById(project.userId);
        if (!user) user = usersServices.unknownUser();
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);

        const projectWithStatusAndUser = {
            id: project.id,
            title: project.title,
            user: userWithoutPassword,
            status: projectStatus,
        };
        return projectWithStatusAndUser;
    },
    createProject: (newProject: INewProject): number => {
        const id = projects.length + 1;
        const project: IProject = {
            id,
            ...newProject,
        };
        projects.push(project);
        return id;
    },
    updateProject: (projectToUpdate: IProjectToUpdate) => {
        const { id, title, content, statusId } = projectToUpdate;
        const project = projectsServices.findProjectById(id);
        if (project && title) project.title = title;
        if (project && content) project.content = content;
        if (project && statusId) project.statusId = statusId;
        return true;
    },
    deleteProject: (id: number): Boolean => {
        const index = projects.findIndex(element => element.id === id);
        if (index === -1) return false;
        projects.splice(index, 1);
        return true;
    },

}

export default projectsServices;