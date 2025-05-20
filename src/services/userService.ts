import db from '../config/db';
import { User } from '../models/User';

// Función para obtener todos los usuarios, se conecte a la base de datos y devuelve un array con de usuarios
export const getAllUsers = async (): Promise<User[]> => {
    const result = await db.execute('SELECT * FROM users');
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as User[];
}