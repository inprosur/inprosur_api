import { Request, Response } from "express";
import * as UserService from '../services/userService';

// Función para obtener todos los usuarios usando el servicio de usuario
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}