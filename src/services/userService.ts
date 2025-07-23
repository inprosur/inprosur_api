import { getTursoClient } from "../config/db";
import { User } from "../models/User";
import { getRoleIdByName } from "./roleService";
import { hashedPassword } from "../utils/hashPassword";

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

  if (result.rows.length === 1) {
    return result.rows[0] as unknown as User;
  } else {
    return null;
  }
};

export const registerInstructor = async (data: {
  username: string;
  email: string;
  password: string;
  uId: string;
  photo?: string;
  biography?: string;
  phone?: string;
}) => {
  const turso = getTursoClient();
  const { username, email, password, uId, photo, biography, phone } = data;

  const transaction = await turso.transaction();

  try {
    const hashed = await hashedPassword(password);

    // Insert user
    const userResult = await transaction.execute({
      sql: "INSERT INTO Users (username, email, password, createdAt, uId, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [
        username,
        email,
        hashed,
        new Date().toISOString(),
        uId,
        photo ?? null,
        1,
      ],
    });

    const userId = userResult.lastInsertRowid;
    if (!userId) throw new Error("Failed to insert user");

    // Insert instructor
    const instructorResult = await transaction.execute({
      sql: "INSERT INTO Instructors (name, biography, phone, userId) VALUES (?, ?, ?, ?)",
      args: [username, biography ?? "", phone ?? "", userId],
    });

    if (instructorResult.rowsAffected === 0)
      throw new Error("Failed to insert instructor");

    // Insert UserRole (get instructor roleId)
    const roleId = await getRoleIdByName("instructor");
    if (!roleId) throw new Error("Instructor role not found");

    const roleResult = await transaction.execute({
      sql: "INSERT INTO UserRoles (userId, roleId) VALUES (?, ?)",
      args: [userId, roleId],
    });

    if (roleResult.rowsAffected === 0)
      throw new Error("Failed to insert user role");

    await transaction.commit();

    return {
      id: userId,
      username,
      email,
      uId,
      photo: photo ?? "",
      status: true,
      biography: biography ?? "",
      phone: phone ?? "",
      roleId,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("[registerInstructorService] Error:", error);
    throw error;
  }
};
