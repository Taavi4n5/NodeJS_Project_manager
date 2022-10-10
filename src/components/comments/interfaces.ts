interface INewComment {
    userId: number;
    projectId: number;
    content: string;
}

interface IComment extends INewComment {
    id: number;
}

export { INewComment, IComment};