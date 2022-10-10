interface INewProject {
    userId: number;
    title: string;
    content: string;
    statusId: number;
}

interface IProject extends INewProject {
    id: number;
}

export {INewProject, IProject};