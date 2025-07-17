import { getTursoClient } from "../config/db";
import { Role } from "../models/Role";

// Función para crear un nuevo rol, se conecta a la base de datos y devuelve el rol creado
export const createRole = async (role: Role): Promise<Role> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO Roles (name, description) VALUES (?, ?)",
    [role.name, role.description]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...role,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Role;
};

// Función para obtener todos los roles, se conecta a la base de datos y devuelve un array con todos los roles.
export const getAllRoles = async (): Promise<Role[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Roles");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Role[];
};

// Función para obtener un rol por su ID, se conecta a la base de datos y devuelve un rol o null si no existe.
export const getRoleById = async (id: number): Promise<Role | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Roles WHERE id=?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Role;
  } else {
    return null;
  }
};

// Función para obtener un rol por su nombre, se conecta a la base de datos y devuelve un rol o null si no existe.
export const getRoleByName = async (name: string): Promise<Role | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Roles WHERE name=?", [
    name,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Role;
  } else {
    return null;
  }
};
