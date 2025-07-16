"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentsCreatedCourses = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const db_1 = __importDefault(require("../config/db"));
const createCourse = async (course) => {
    const result = await db_1.default.execute("INSERT INTO Courses (title, description, creationDate, price, duration, isPublished, thumbnailUrl, instructorId, categoryId, subcategoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        course.title,
        course.description,
        course.creationDate.toISOString(),
        course.price,
        course.duration || null,
        course.isPublished ? 1 : 0,
        course.thumbnailUrl || null,
        course.instructorId,
        course.categoryId,
    ]);
    const id = result.lastInsertRowid;
    const row = {
        ...course,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createCourse = createCourse;
const getAllCourses = async () => {
    const result = await db_1.default.execute("SELECT * FROM Courses");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllCourses = getAllCourses;
const getCourseById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM Courses WHERE id=?", [id]);
    const row = Array.isArray(result) ? result[0] : result.rows;
    if (row.length == 1) {
        return row[0];
    }
    else {
        return null;
    }
};
exports.getCourseById = getCourseById;
const getRecentsCreatedCourses = async () => {
    const result = await db_1.default.execute(`
    SELECT *
    FROM courses
    WHERE isPublished = true
    ORDER BY datetime(creationDate) DESC
    LIMIT 10
  `);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getRecentsCreatedCourses = getRecentsCreatedCourses;
