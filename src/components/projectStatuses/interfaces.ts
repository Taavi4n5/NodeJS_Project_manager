interface INewProjectStatus {
    status: string;
}

interface IProjectStatus extends INewProjectStatus {
    id: number;
}

export { INewProjectStatus, IProjectStatus};