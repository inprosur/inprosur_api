import db from "../config/db";
import { User } from "../models/User";
import { hashedPassword } from "../utils/hashPassword";

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

//funsion para obtener usuariospor email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const row = Array.isArray(result) ? result[0] : result.rows;
  if (row.length == 1) {
    return row[0] as User;
  } else {
    return null;
  }
};

export const updateUser = async (
  id: number,
  updates: Partial<User>
): Promise<User | null> => {
  if (updates.password) {
    updates.password = await hashedPassword(updates.password);
  }

  const fields = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(updates);

  if (fields.length === 0) {
    throw new Error("No fields provides to update");
  }

  const result = await db.execute(`UPDATE users SET ${fields} WHERE id = ?`, [
    ...values,
    id,
  ]);

  if (result.rowsAffected === 0) {
    return null;
  }

  return getUserById(id);
};
export const deleteUser = async (id: number): Promise<User | null> => {
  // Verificar si el usuario existe
  const user = await getUserById(id);
  if (!user) return null;

  // Ejecutar la eliminación
  await db.execute("DELETE FROM users WHERE id = ?", [id]);

  return user; // Retornar el usuario eliminado
};