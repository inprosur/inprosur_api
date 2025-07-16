"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseVideo = exports.getCourseVideoById = exports.getAllCourseVideos = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllCourseVideos = async () => {
    const result = await db_1.default.execute("SELECT * FROM CourseVideos");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllCourseVideos = getAllCourseVideos;
const getCourseVideoById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM CourseVideos WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getCourseVideoById = getCourseVideoById;
const createCourseVideo = async (video) => {
    const result = await db_1.default.execute("INSERT INTO CourseVideos (courseId, title, description, url, thumbnailUrl, duration, price) VALUES (?, ?, ?, ?, ?, ?, ?)", [video.courseId, video.title, video.description, video.url, video.thumbnailUrl, video.duration, video.price]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...video
    };
};
exports.createCourseVideo = createCourseVideo;
