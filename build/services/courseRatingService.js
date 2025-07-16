"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRankingCourseRating = exports.getCourseRatingByStudent = exports.createCourseRating = exports.getCourseRating = exports.getAllCourseRatings = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllCourseRatings = async () => {
    const result = await db_1.default.execute("SELECT * FROM CourseRatings");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllCourseRatings = getAllCourseRatings;
const getCourseRating = async (courseId) => {
    const result = await db_1.default.execute(`SELECT courseId, 
            ROUND(AVG(CAST(rating AS FLOAT)), 2) as averageRating 
     FROM CourseRatings 
     WHERE courseId = ? 
     GROUP BY courseId`, [courseId]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (!rows || rows.length === 0) {
        return null;
    }
    return {
        courseId,
        averageRating: Number(rows[0].averageRating),
    };
};
exports.getCourseRating = getCourseRating;
const createCourseRating = async (rating) => {
    // Validar que el rating esté entre 1 y 5
    if (rating.rating < 1 || rating.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    const result = await db_1.default.execute(`INSERT INTO CourseRatings (
            studentId, 
            courseId, 
            rating
        ) VALUES (?, ?, ?)`, [rating.studentId, rating.courseId, rating.rating]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...rating,
    };
};
exports.createCourseRating = createCourseRating;
const getCourseRatingByStudent = async (studentId) => {
    const result = await db_1.default.execute("SELECT rating FROM CourseRating WHERE studentId = ?", [studentId]);
    const row = Array.isArray(result) ? result[0] : result.rows;
    if (!row || row.length === 0) {
        return null;
    }
    return Number(row[0].rating);
};
exports.getCourseRatingByStudent = getCourseRatingByStudent;
const getRankingCourseRating = async () => {
    const result = await db_1.default.execute(`SELECT
    c.id,
    c.title,
    c.description,
    c.instructorId,
    c.thumbnailUrl,
    ROUND(AVG(cr.rating), 2) AS averageRating,
    COUNT(cr.id) AS ratingCount
  FROM
    Courses c
    JOIN CourseRatings cr ON cr.courseId = c.id
  WHERE
    c.isPublished = 1
  GROUP BY
    c.id,
    c.title
  ORDER BY
    averageRating DESC,
    ratingCount DESC
  LIMIT
    10;`);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getRankingCourseRating = getRankingCourseRating;
