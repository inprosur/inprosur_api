import db from '../config/db';
import { Degress } from '../models/Degress';

export const getAllDegress = async (): Promise<Degress[]> => {
    const result = await db.execute('SELECT * FROM degress');
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as Degress[];
}

export const getDegressById = async (id: number): Promise<Degress | null> => {
    const result = await db.execute('SELECT * FROM degress WHERE id = ?', [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length ? { 
        id: rows[0].id, 
        name: rows[0].name, 
        description: rows[0].description 
    } : null;
}

export const createDegress = async (degress: Omit<Degress, 'id'>): Promise<Degress> => {
    const result = await db.execute(
        'INSERT INTO degress (name, description) VALUES (?, ?)',
        [degress.name, degress.description]
    );
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return { 
        id: rows.insertId, 
        name: degress.name, 
        description: degress.description 
    };
}