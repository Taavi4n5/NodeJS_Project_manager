import { Request, Response } from "express";
import { users } from "../../mockData";
import { IUserWithoutPassword, IUser, INewUser, IUserWithoutRole } from "./interfaces";
import services from "./services";
import usersServices from "./services";

const usersControllers = {
    getAllUsers: (req: Request, res: Response) => {
        const usersWithoutPassword = services.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'List of users',
            users: usersWithoutPassword,
        });
    },
    getUserById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user: IUser | undefined = usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);

        return res.status(200).json({
            success: true,
            message: `User`,
            data: {
                user: userWithoutPassword
            },
        });
    },
    updateUser: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { firstName, lastName, email, password } = req.body;
        const user: IUser| undefined = usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        if (!firstName && !lastName && !email && !password) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        const userToUpdate: IUserWithoutRole = {
            id,
            firstName,
            lastName,
            email,
            password,
        };
    
        usersServices.updateUser(userToUpdate);
    
        return res.status(200).json({
            success: true,
            message: `User updated`,
        });
    },
    createUser: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (firstName, lastName, email, password)`,
            });
        }
        const newUser: INewUser = {
            firstName,
            lastName,
            email,
            password,
            role,
        };
        const id = await usersServices.createUser(newUser);
        return res.status(201).json({
            success: true,
            message: `User with id ${id} created`,
        });
    },
    deleteUser: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = usersServices.deleteUser(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        
        return res.status(200).json({
            success: true,
            message: `User deleted`,
        });
    },
};

export default usersControllers;