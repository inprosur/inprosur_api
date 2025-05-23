import db from "../config/db";
import { UserRole } from "../models/UserRole";

// Función para crear una nueva relación entre usuario y role
export const createUsuarioRole = async (
  userRole: UserRole
): Promise<UserRole> => {
  const result = await db.execute(
    "INSERT INTO UserRoles (userId, roleId) VALUES (?, ?)",
    [userRole.userId, userRole.roleId]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...userRole,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as UserRole;
};
