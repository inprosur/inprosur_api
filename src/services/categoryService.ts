import db from "../config/db";
import { Category } from "../models/Category";

export const getAllCategories = async (): Promise<Category[]> => {
  const result = await db.execute("SELECT * FROM categories");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Category[];
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const result = await db.execute("SELECT * FROM categories WHERE id = ?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length == 1) {
    return rows[0] as Category;
  } else {
    return null;
  }
};

export const createCategory = async (category: Category): Promise<Category> => {
  const result = await db.execute(
    "INSERT INTO categories (name, degreeId) VALUES (?, ?)",
    [category.name, category.degreeId]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...category,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Category;
};