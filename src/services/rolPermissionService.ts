import db from "../config/db";
import { RolePermission } from "../models/RolePermission";

// Función para crear una nueva relación entre rol y permiso
export const createRolePermission = async (
  rolePermission: RolePermission
): Promise<RolePermission> => {
  const result = await db.execute(
    "INSERT INTO RolePermissions (roleId, permissionId) VALUES (?, ?)",
    [rolePermission.roleId, rolePermission.permissionId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  const newRolePermission = rows[0] as RolePermission;
  return newRolePermission;
};

export const getRollPermissionByIds = async (
  rolePermission: RolePermission
): Promise<RolePermission | null> => {
  const result = await db.execute(
    "SELECT * FROM RolePermissions WHERE roleId=? AND permissionId=?",
    [rolePermission.roleId, rolePermission.permissionId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as RolePermission;
  } else {
    return null;
  }
};
