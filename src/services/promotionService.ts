import db from "../config/db";
import { Promotion } from "../models/Promotion";

export const getAllPromotions = async (): Promise<Promotion[]> => {
    const result = await db.execute("SELECT * FROM promotions");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as Promotion[];
};

export const getPromotionById = async (id: number): Promise<Promotion | null> => {
    const result = await db.execute("SELECT * FROM promotions WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] as Promotion : null;
};

export const createPromotion = async (promotion: Omit<Promotion, 'id'>): Promise<Promotion> => {
    const result = await db.execute(
        "INSERT INTO promotions (courseId, startDate, endDate, discountPercentage, status) VALUES (?, ?, ?, ?, ?)",
        [
            promotion.courseId,
            promotion.startDate.toISOString(),
            promotion.endDate.toISOString(),
            promotion.discountPercentage,
            promotion.status
        ]
    );
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...promotion
    };
};