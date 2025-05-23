import db from "../config/db";
import { Role } from "../models/Role";

// Función para crear un nuevo rol, se conecta a la base de datos y devuelve el rol creado
export const createRole = async (role: Role): Promise<Role> => {
  const result = await db.execute(
    "INSERT INTO Roles (name, description) VALUES (?, ?)",
    [role.name, role.description]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  const newRole = { ...role, id: rows.insertId };
  return newRole;
};

// Función para obtener todos los roles, se conecta a la base de datos y devuelve un array con todos los roles.
export const getAllRoles = async (): Promise<Role[]> => {
  const result = await db.execute("SELECT * FROM Roles");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Role[];
};

// Función para obtener un rol por su ID, se conecta a la base de datos y devuelve un rol o null si no existe.
export const getRoleById = async (id: number): Promise<Role | null> => {
  const result = await db.execute("SELECT * FROM Roles WHERE id=?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Role;
  } else {
    return null;
  }
};

// Función para obtener un rol por su nombre, se conecta a la base de datos y devuelve un rol o null si no existe.
export const getRoleByName = async (name: string): Promise<Role | null> => {
  const result = await db.execute("SELECT * FROM Roles WHERE name=?", [name]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Role;
  } else {
    return null;
  }
};
