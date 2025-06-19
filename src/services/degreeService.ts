import db from "../config/db";
import { Degree } from "../models/Degree";

export const getAllDegrees = async (): Promise<Degree[]> => {
  const result = await db.execute("SELECT * FROM degrees");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Degree[];
};

export const getDegreesById = async (id: number): Promise<Degree | null> => {
  const result = await db.execute("SELECT * FROM degrees WHERE id = ?", [id]);
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
  const result = await db.execute(
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
