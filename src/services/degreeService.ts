import { getTursoClient } from "../config/db";
import { Degree } from "../models/Degree";

export const getAllDegrees = async (): Promise<Degree[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM degrees");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Degree[];
};

export const getDegreesById = async (id: number): Promise<Degree | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM degrees WHERE id = ?", [
    id,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length
    ? {
        id: rows[0].id,
        name: rows[0].name,
        description: rows[0].description,
      }
    : null;
};

export const createDegrees = async (
  degress: Omit<Degree, "id">
): Promise<Degree> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO degrees (name, description) VALUES (?, ?)",
    [degress.name, degress.description]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return {
    id: rows.insertId,
    name: degress.name,
    description: degress.description,
  };
};

export const updateDegrees = async (
  id: number,
  updatedData: Omit<Degree, "id">
): Promise<Degree | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "UPDATE degrees SET name = ?, description = ? WHERE id = ?",
    [updatedData.name, updatedData.description, id]
  );

  // Verificar si se actualizó algún registro
  if (result.rowsAffected && result.rowsAffected > 0) {
    return {
      id,
      ...updatedData,
    };
  }

  return null;
};

export const deleteDegrees = async (id: number): Promise<boolean> => {
  const client = getTursoClient();
  const result = await client.execute("DELETE FROM degrees WHERE id = ?", [id]);
  return (result.rowsAffected ?? 0) > 0;
};
