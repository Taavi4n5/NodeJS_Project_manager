import { comments } from "../../mockData";
import { IUser } from "../users/interfaces";
import usersServices from "../users/services";
import { IComment, INewComment } from "./interfaces";

const commentsServices = {
    getAllComments: () => {
        const commentsWithUsers = comments.map(comment => {
        let user: IUser | undefined = usersServices.findUserById(comment.id);
        if (!user) user = usersServices.unknownUser();
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);
        const commentWithUser = {
            id: comment.id,
            content: comment.content,
            user: userWithoutPassword,
        };
        return commentWithUser;
    });
    return commentsWithUsers
    },
    getCommentById: (id: number): IComment | undefined => {
        const comment = comments.find(element => {
            return element.id === id;
        });
        return comment;
    },
    findCommentsByProjectId: (id: number): IComment[] => {
        const projectComments = comments.filter(comment => comment.projectId === id);
        return projectComments;
    },
    createComment: (newComment: INewComment) => {
        const id = comments.length + 1;
        const comment: IComment = {
            id,
            ... newComment
        };
        comments.push(comment);
        return id;
    },
    deleteComments: (id: number): Boolean => {
        const index = comments.findIndex(element => element.id === id);
        if (index === -1) return false;
        comments.splice(index, 1);
        return true;
    },
}

export default commentsServices;