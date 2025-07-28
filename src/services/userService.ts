import { getTursoClient } from "../config/db";
import { User } from "../models/User";
import { Instructor } from "../models/Instructor";
//import { createInstructor } from "./instructorService";
import { getRoleIdByName } from "./roleService";
//import { createUsuarioRole } from "./userRolesService";
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

export const createUserWithTransaction = async (data: {
  username: string;
  email: string;
  password: string;
  uId: string;
  photo?: string;
  biography?: string;
  phone?: string;
}): Promise<{
  user: User;
  instructor: Instructor;
  roleId: number;
}> => {
  const turso = getTursoClient();
  const transaction = await turso.transaction();

  try {
    const hashed = await hashedPassword(data.password);

    // Insert user
    const userResult = await transaction.execute({
      sql: "INSERT INTO Users (username, email, password, createdAt, uId, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [
        data.username,
        data.email,
        hashed,
        new Date().toISOString(),
        data.uId,
        data.photo ?? null,
        1,
      ],
    });

    const userId = userResult.lastInsertRowid;
    if (!userId) throw new Error("Failed to insert user");

    // Insert instructor
    const instructorResult = await transaction.execute({
      sql: "INSERT INTO Instructors (name, biography, phone, createdAt, userId) VALUES (?, ?, ?, ?, ?)",
      args: [
        data.username,
        data.biography ?? "",
        data.phone ?? "",
        new Date().toISOString(),
        userId,
      ],
    });

    if (instructorResult.rowsAffected === 0) {
      throw new Error("Failed to insert instructor");
    }

    // Insert UserRole
    const roleId = await getRoleIdByName("instructor");
    if (!roleId) throw new Error("Instructor role not found");

    const roleResult = await transaction.execute({
      sql: "INSERT INTO UserRoles (userId, roleId) VALUES (?, ?)",
      args: [userId, roleId],
    });

    if (roleResult.rowsAffected === 0) {
      throw new Error("Failed to insert user role");
    }

    await transaction.commit();

    const user: User = {
      id: typeof userId === "bigint" ? Number(userId) : userId,
      username: data.username,
      email: data.email,
      password: hashed,
      createdAt: new Date(),
      uId: data.uId,
      photo: data.photo ?? "",
      status: true,
    };

    const instructor: Instructor = {
      id: instructorResult.lastInsertRowid
        ? Number(instructorResult.lastInsertRowid)
        : undefined,
      name: data.username,
      biography: data.biography ?? "",
      phone: data.phone ?? "",
      createdAt: new Date(),
      userId: typeof userId === "bigint" ? Number(userId) : userId,
    };

    return { user, instructor, roleId };
  } catch (error) {
    await transaction.rollback();
    console.error("[createUserWithTransaction] Error:", error);
    throw error;
  }
};

export const getFullUserByEmail = async (email: string): Promise<any | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    `SELECT 
        u.id AS userId,
        u.username,
        u.email,
        u.uId,
        u.photo,
        u.status,
        u.createdAt,

        i.id AS instructorId,
        i.name AS instructorName,
        i.biography,
        i.phone,
        i.createdAt AS instructorCreatedAt,

        ur.roleId,
        r.name AS roleName,
        p.name AS permissionName

      FROM users u
      LEFT JOIN instructors i ON u.id = i.userId
      LEFT JOIN userRoles ur ON u.id = ur.userId
      LEFT JOIN roles r ON ur.roleId = r.id
      LEFT JOIN rolePermissions rp ON ur.roleId = rp.roleId
      LEFT JOIN permissions p ON p.id = rp.permissionId
      WHERE u.email = ?`,
    [email]
  );

  const rows = result.rows;

  if (!rows.length) return null;

  const base = rows[0];

  const permissions = rows
    .map(row => row.permissionName)
    .filter(p => !!p); // eliminar nulos si no hay permisos

  return {
    id: base.userId,
    username: base.username,
    email: base.email,
    uId: base.uId,
    photo: base.photo,
    status: !!base.status,
    createdAt: base.createdAt,
    instructor: base.instructorId
      ? {
          id: base.instructorId,
          name: base.instructorName,
          biography: base.biography,
          phone: base.phone,
          createdAt: base.instructorCreatedAt,
          userId: base.userId,
        }
      : null,
    roleId: base.roleId || null,
    roleName: base.roleName || null,
    permissions,
  };
};
