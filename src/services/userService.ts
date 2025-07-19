import { getTursoClient } from "../config/db";
import { User } from "../models/User";

interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  uId: string;
  photo: string | null;
  status: string;
  createdAt: string | Date;
}

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
      user.status,
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

    return rows.map((row: UserRow) => ({
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password, // Nota: Esto no debería exponerse en respuestas API
      uId: row.uId,
      photo: row.photo,
      status: row.status,
      createdAt: new Date(row.createdAt),
    }));
  } catch (error) {
    console.error("Error en userService.getAllUsers:", error);
    throw new Error("Error al obtener usuarios de la base de datos");
  }
};
