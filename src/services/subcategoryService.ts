import db from "../config/db";
import { Subcategory } from "../models/Subcategory";

export const getAllSubcategories = async (): Promise<Subcategory[]> => {
  const result = await db.execute("SELECT * FROM subcategories");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Subcategory[];
};

export const getSubcategoryById = async (id: number): Promise<Subcategory | null> => {
  const result = await db.execute("SELECT * FROM subcategories WHERE id = ?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length == 1) {
    return rows[0] as Subcategory;
  } else {
    return null;
  }
};

export const createSubcategory = async (subcategory: Subcategory): Promise<Subcategory> => {
  const result = await db.execute(
    "INSERT INTO subcategories (name, categoryId) VALUES (?, ?)",
    [subcategory.name, subcategory.categoryId]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...subcategory,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Subcategory;
};