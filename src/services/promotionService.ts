import { getTursoClient } from "../config/db";
import { Promotion } from "../models/Promotion";

export const getAllPromotions = async (): Promise<Promotion[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM promotions");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Promotion[];
};

export const getPromotionById = async (
  id: number
): Promise<Promotion | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM promotions WHERE id = ?", [
    id,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as Promotion) : null;
};

export const createPromotion = async (
  promotion: Omit<Promotion, "id">
): Promise<Promotion> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO promotions (courseId, startDate, endDate, discountPercentage, status) VALUES (?, ?, ?, ?, ?)",
    [
      promotion.courseId,
      promotion.startDate.toISOString(),
      promotion.endDate.toISOString(),
      promotion.discountPercentage,
      promotion.status,
    ]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...promotion,
  };
};

export const updatePromotion = async (
  id: number,
  promotion: Partial<Omit<Promotion, "id">>
): Promise<boolean> => {
  const client = getTursoClient();

  // Construir consulta dinámica
  const fieldsToUpdate: string[] = [];
  const values: any[] = [];

  if (promotion.courseId !== undefined) {
    fieldsToUpdate.push("courseId = ?");
    values.push(promotion.courseId);
  }
  if (promotion.startDate !== undefined) {
    fieldsToUpdate.push("startDate = ?");
    values.push(promotion.startDate.toISOString());
  }
  if (promotion.endDate !== undefined) {
    fieldsToUpdate.push("endDate = ?");
    values.push(promotion.endDate.toISOString());
  }
  if (promotion.discountPercentage !== undefined) {
    fieldsToUpdate.push("discountPercentage = ?");
    values.push(promotion.discountPercentage);
  }
  if (promotion.status !== undefined) {
    fieldsToUpdate.push("status = ?");
    values.push(promotion.status);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields provided for update");
  }

  values.push(id);

  const query = `UPDATE promotions SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
  const result = await client.execute(query, values);
  return result.rowsAffected > 0;
};

export const deletePromotion = async (id: number): Promise<boolean> => {
  const client = getTursoClient();
  const result = await client.execute(
    "DELETE FROM promotions WHERE id = ?",
    [id]
  );
  return result.rowsAffected > 0;
};