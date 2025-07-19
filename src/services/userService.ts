import { getTursoClient } from "../config/db";
import { User } from "../models/User";

export const createUser = async (user: User): Promise<User> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO users (username, email, password, uId, createdAt, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      user.username,
      user.email,
      user.password,
      user.uId,
      user.createdAt.toISOString(),
      user.photo,
      user.status ? 1 : 0, // Convert boolean to integer for status
    ]
  );

  return {
    ...user,
    id: Number(result.lastInsertRowid),
  };
};

export const getAllUsers = async (): Promise<User[]> => {
  const client = getTursoClient();

  try {
    const result = await client.execute("SELECT * FROM users");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as User[];
  } catch (error) {
    console.error("Error en userService.getAllUsers:", error);
    throw new Error("Error al obtener usuarios de la base de datos");
  }
};
