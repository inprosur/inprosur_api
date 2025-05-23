import db from "../config/db";
import { Permission } from "../models/Permission";

// Función para crear un nuevo permiso, se conecta a la base de datos y devuelve el permiso creado
export const createPermission = async (
  permission: Permission
): Promise<Permission> => {
  const result = await db.execute(
    "INSERT INTO Permissions (name, description) VALUES (?, ?)",
    [permission.name, permission.description]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...permission,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Permission;
};

// Función para obtener todos los permisos, se conecta a la base de datos y devuelve un array con todos los permisos
export const getAllPermissions = async (): Promise<Permission[]> => {
  const result = await db.execute("SELECT * FROM Permissions");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Permission[];
};

// Función para obtener un permiso por su ID, se conecta a la base de datos y devuelve un permiso o null si el permiso no existe
export const getPermissionById = async (
  id: number
): Promise<Permission | null> => {
  const result = await db.execute("SELECT * FROM Permissions WHERE id = ?", [
    id,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Permission;
  } else {
    return null;
  }
};
