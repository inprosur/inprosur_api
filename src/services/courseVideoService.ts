import { getTursoClient } from "../config/db";
import { CourseVideo, CourseVideoUpdate } from "../models/CourseVideo";

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

export const getVideosByLesson = async (
  lessonId: number
): Promise<CourseVideo[]> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM CourseVideos WHERE lessonId = ?",
    [lessonId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as CourseVideo[];
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

export const updateCourseVideo = async (
  id: number,
  video: CourseVideoUpdate
): Promise<boolean> => {
  const client = getTursoClient();

  // 1. Obtener el video actual para valores por defecto
  const currentVideo = await getCourseVideoById(id);
  if (!currentVideo) {
    throw new Error("Video not found");
  }

  // 2. Crear objeto con valores seguros (no undefined)
  const safeUpdateData = {
    lessonId: video.lessonId ?? currentVideo.lessonId,
    title: video.title ?? currentVideo.title,
    description: video.description ?? currentVideo.description,
    url: video.url ?? currentVideo.url,
    thumbnailUrl: video.thumbnailUrl ?? currentVideo.thumbnailUrl,
    duration: video.duration ?? currentVideo.duration,
    price: video.price ?? currentVideo.price,
  };

  // 3. Ejecutar la consulta con valores garantizados
  const result = await client.execute(
    "UPDATE CourseVideos SET lessonId = ?, title = ?, description = ?, url = ?, thumbnailUrl = ?, duration = ?, price = ? WHERE id = ?",
    [
      safeUpdateData.lessonId,
      safeUpdateData.title,
      safeUpdateData.description,
      safeUpdateData.url,
      safeUpdateData.thumbnailUrl,
      safeUpdateData.duration,
      safeUpdateData.price,
      id
    ]
  );

  return result.rowsAffected > 0;
};

export const deleteCourseVideo = async (id: number): Promise<boolean> => {
  const client = getTursoClient();
  const result = await client.execute(
    "DELETE FROM CourseVideos WHERE id = ?",
    [id]
  );
  return result.rowsAffected > 0;
};