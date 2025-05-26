import db from "../config/db";
import { CourseVideo } from "../models/CourseVideo";

export const getAllCourseVideos = async (): Promise<CourseVideo[]> => {
    const result = await db.execute("SELECT * FROM CourseVideos");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows as CourseVideo[];
};

export const getCourseVideoById = async (id: number): Promise<CourseVideo | null> => {
    const result = await db.execute("SELECT * FROM CourseVideos WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] as CourseVideo : null;
};

export const createCourseVideo = async (video: Omit<CourseVideo, 'id'>): Promise<CourseVideo> => {
    const result = await db.execute(
        "INSERT INTO CourseVideos (courseId, title, description, url, thumbnailUrl, duration, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [video.courseId, video.title, video.description, video.url, video.thumbnailUrl, video.duration, video.price]
    );
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...video
    };
};