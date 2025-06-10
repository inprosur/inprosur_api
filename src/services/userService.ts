import db from "../config/db";
import { User } from "../models/User";

// Función para obtener todos los usuarios, se conecta a la base de datos y devuelve un array con todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
  const result = await db.execute("SELECT * FROM users");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as User[];
};

// Función para obtener un usuario por su ID, se conecta a la base de datos y devuelve un usuario o null si no existe
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await db.execute("SELECT * FROM users WHERE id =?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length == 1) {
    return rows[0] as User;
  } else {
    return null;
  }
};

// Función para crear un nuevo usuario, se conecta a la base de datos y devuelve el usuario creado
export const createUser = async (user: User): Promise<User> => {
  const result = await db.execute(
    "INSERT INTO Users (username, email, password, uId, createdAt) VALUES (?,?,?,?,?)",
    [
      user.username,
      user.email,
      user.password,
      user.uId,
      user.createdAt.toISOString(),
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...user,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as User;
};
