import { users } from "../../mockData";
import { IUser, IUserWithoutPassword } from "./interfaces";

const usersServices = {
    findUserById: (id: number): IUserWithoutPassword | undefined => {
        let user: IUserWithoutPassword | undefined = users.find(element => element.id === id);
        return user;
    },
    getUserWithoutPassword: (user: IUserWithoutPassword): IUserWithoutPassword => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    },
    unknownUser: (): IUser => {
        return {
                id: 0,
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@doe.com',
                password: 'jane',
            };
    },
    getAllUsers: () => {
            const usersWithoutPassword = users.map(user => {
            const userWithoutPassword = usersServices.getUserWithoutPassword(user);
            return userWithoutPassword;
        })
        return usersWithoutPassword;
    },
    createUser: (tmpUser: { firstName: string; lastName: string; email: string; password: any; }):number => {
        const id = users.length + 1;
        const newUser: IUser = {
            id,
            firstName: tmpUser.firstName,
            lastName: tmpUser.lastName,
            email: tmpUser.email,
            password: tmpUser.password
        };
        users.push(newUser);
        return id;
    }
};



export default usersServices;