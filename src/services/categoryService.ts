import { getTursoClient } from "../config/db";
import { Category } from "../models/Category";

export const getAllCategories = async (): Promise<Category[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT c.*, d.name as degreeName FROM categories c LEFT JOIN degrees d ON c.degreeId = d.id");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as (Category & { degreeName: string })[];
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM categories WHERE id = ?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length ? (rows[0] as Category) : null;
};

export const getCategoriesByDegreeId = async (
  degreeId: number
): Promise<Category[]> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM categories WHERE degreeId = ?",
    [degreeId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Category[];
};

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO categories (name, degreeId) VALUES (?, ?)",
    [category.name, category.degreeId]
  );
  const id = result.lastInsertRowid;
  return {
    ...category,
    id: id !== undefined ? Number.parseInt(id.toString()) : 0,
  };
};

export const updateCategory = async (
  id: number,
  updatedData: Omit<Category, "id">
): Promise<Category | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "UPDATE categories SET name = ?, degreeId = ? WHERE id = ?",
    [updatedData.name, updatedData.degreeId, id]
  );

  return (result.rowsAffected && result.rowsAffected > 0)
    ? { id, ...updatedData }
    : null;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const client = getTursoClient();
  const result = await client.execute("DELETE FROM categories WHERE id = ?", [id]);
  return (result.rowsAffected ?? 0) > 0;
};
