import db from '../config/db';
import { User } from '../models/User';

// Función para obtener todos los usuarios, se conecta a la base de datos y devuelve un array con de usuarios
export const getAllUsers = async (): Promise<User[]> => {
    const result = await db.execute('SELECT * FROM users');
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as User[];
}

// Función para obtener un usuario por su ID, se conecta a la base de datos y devuelve un usuario o null si no existe
export const getUserById = async (id: number): Promise<User | null> => {
    const result = await db.execute('SELECT * FROM users WHERE id =?', [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length > 0) {
        return rows[0] as User;
    } else {
        return null;
    }
}

// Función para crear un nuevo usuario, se conecta a la base de datos y devuelve el usuario creado
export const createUser = async (user: User): Promise<User> => {
    const result = await db.execute('INSERT INTO users (username, email, password, createdAt) VALUES (?,?,?,?)', [user.username, user.email, user.password, user.createdAt]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    const newUser = { ...user, id: rows.insertId};
    return newUser;
}
