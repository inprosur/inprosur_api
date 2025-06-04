import db from "../config/db";
import { CourseRating } from "../models/CourseRating";

export const getAllCourseRatings = async (): Promise<CourseRating[]> => {
  const result = await db.execute("SELECT * FROM CourseRatings");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as CourseRating[];
};

export const getCourseRating = async (
  courseId: number
): Promise<{ courseId: number; averageRating: number } | null> => {
  const result = await db.execute(
    `SELECT courseId, 
            ROUND(AVG(CAST(rating AS FLOAT)), 2) as averageRating 
     FROM CourseRatings 
     WHERE courseId = ? 
     GROUP BY courseId`,
    [courseId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;

  if (!rows || rows.length === 0) {
    return null;
  }

  return {
    courseId,
    averageRating: Number(rows[0].averageRating),
  };
};

export const createCourseRating = async (
  rating: Omit<CourseRating, "id">
): Promise<CourseRating> => {
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
    [rating.studentId, rating.courseId, rating.rating]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...rating,
  };
};

export const getCourseRatingByStudent = async (
  studentId: number
): Promise<number | null> => {
  const result = await db.execute(
    "SELECT rating FROM CourseRating WHERE studentId = ?",
    [studentId]
  );

  const row = Array.isArray(result) ? result[0] : result.rows;

  if (!row || row.length === 0) {
    return null;
  }
  return Number(row[0].rating);
};
