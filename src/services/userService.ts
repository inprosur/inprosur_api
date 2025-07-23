import { getTursoClient } from "../config/db";
import { User } from "../models/User";
//import { hashedPassword } from "../utils/hashPassword";

export const createUser = async (user: User): Promise<User> => {
  const turso = getTursoClient();

  const result = await turso.execute(
    "INSERT INTO Users (username, email, password, createdAt, uId, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      user.username,
      user.email,
      user.password,
      user.createdAt.toISOString(),
      user.uId,
      user.photo ?? null,
      user.status,
    ]
  );
  const id = result.lastInsertRowid;
  const newUser = {
    ...user,
    id: id !== undefined ? Number(id) : undefined,
  };
  return newUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM users");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as User[];
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as User;
  } else {
    return null;
  }
};
