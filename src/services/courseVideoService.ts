import { getTursoClient } from "../config/db";
import { CourseVideo } from "../models/CourseVideo";

export const getAllCourseVideos = async (): Promise<CourseVideo[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM CourseVideos");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as CourseVideo[];
};

export const getCourseVideoById = async (
  id: number
): Promise<CourseVideo | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM CourseVideos WHERE id = ?",
    [id]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as CourseVideo) : null;
};

export const createCourseVideo = async (
  video: Omit<CourseVideo, "id">
): Promise<CourseVideo> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO CourseVideos (lessonId, title, description, url, thumbnailUrl, duration, price) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      video.lessonId,
      video.title,
      video.description,
      video.url,
      video.thumbnailUrl,
      video.duration,
      video.price,
    ]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...video,
  };
};
