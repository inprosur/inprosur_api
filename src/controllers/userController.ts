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

// Función para obtener un usuario por su ID usando el servicio de usuario. Se espera que el ID sea un número entero y se maneja un error 400 si no lo es.
export const getUserById = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: 'Invalid user Id' });
    } else {
        try {
            const user = await UserService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

// Función para crear un nuevo usuario usando el servicio de usuario. Se espera que el cuerpo de las solicitud contenga los campos username, email y password. Se maneja un error 400 si faltan campos requeridos.
export const creareUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ error: 'Missing requiered fields' });
    } else {
        try {
            const newUser = await UserService.createUser({ username, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}