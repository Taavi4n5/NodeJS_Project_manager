interface INewUserWithPassword {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IUser extends INewUserWithPassword {
    id: number;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export {INewUserWithPassword, IUserWithoutPassword, IUser};