interface INewProject {
    userId: number;
    title: string;
    content: string;
    statusId: number;
}

interface IProject extends INewProject {
    id: number;
}

interface IProjectToUpdate {
    id: number;
    title?: string;
    content?: string;
    statusId?: number;
}

export { INewProject, IProject, IProjectToUpdate };