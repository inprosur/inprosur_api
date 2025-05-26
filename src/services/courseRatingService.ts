import db from "../config/db";
import { CourseRating } from "../models/CourseRating";

export const getAllCourseRatings = async (): Promise<CourseRating[]> => {
    const result = await db.execute("SELECT * FROM CourseRatings");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as CourseRating[];
};

export const getCourseRatingById = async (id: number): Promise<CourseRating | null> => {
    const result = await db.execute("SELECT * FROM CourseRatings WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] as CourseRating : null;
};

export const createCourseRating = async (rating: Omit<CourseRating, 'id'>): Promise<CourseRating> => {
    // Validar que el rating esté entre 1 y 5
    if (rating.rating < 1 || rating.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }

    const result = await db.execute(
        `INSERT INTO CourseRatings (
            studentId, 
            courseId, 
            rating
        ) VALUES (?, ?, ?)`,
        [
            rating.studentId,
            rating.courseId,
            rating.rating
        ]
    );
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...rating
    };
};