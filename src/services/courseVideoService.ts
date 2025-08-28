import { getTursoClient } from "../config/db";
import { CourseVideo, CourseVideoUpdate } from "../models/CourseVideo";

export const getAllCourseVideos = async (): Promise<CourseVideo[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM CourseVideos ORDER BY lessonId, display_order");
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
    "SELECT * FROM CourseVideos WHERE lessonId = ? ORDER BY display_order",
    [lessonId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as CourseVideo[];
};

// FUNCIÓN AUXILIAR: Obtener el próximo display_order para una lección
const getNextDisplayOrder = async (lessonId: number): Promise<number> => {
  const client = getTursoClient();
  
  // Obtener el máximo display_order de videos para esta lección
  const videoResult = await client.execute(
    "SELECT MAX(display_order) as max_order FROM CourseVideos WHERE lessonId = ?",
    [lessonId]
  );
  const videoRows = Array.isArray(videoResult) ? videoResult[0] : videoResult.rows;
  const videoMaxOrder = videoRows[0]?.max_order || 0;
  
  // Obtener el máximo display_order de documentos para esta lección
  const docResult = await client.execute(
    "SELECT MAX(display_order) as max_order FROM CourseDocuments WHERE lessonId = ?",
    [lessonId]
  );
  const docRows = Array.isArray(docResult) ? docResult[0] : docResult.rows;
  const docMaxOrder = docRows[0]?.max_order || 0;
  
  // El próximo order es el máximo entre ambos + 1
  return Math.max(videoMaxOrder, docMaxOrder) + 1;
};

export const createCourseVideo = async (
  video: Omit<CourseVideo, "id" | "display_order">
): Promise<CourseVideo> => {
  const client = getTursoClient();
  
  // Obtener el próximo display_order automáticamente
  const display_order = await getNextDisplayOrder(video.lessonId);
  
  const result = await client.execute(
    "INSERT INTO CourseVideos (lessonId, title, description, url, thumbnailUrl, duration, price, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      video.lessonId,
      video.title,
      video.description,
      video.url,
      video.thumbnailUrl,
      video.duration,
      video.price,
      display_order
    ]
  );
  
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...video,
    display_order
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
    display_order: video.display_order ?? currentVideo.display_order,
  };

  // 3. Ejecutar la consulta con valores garantizados
  const result = await client.execute(
    "UPDATE CourseVideos SET lessonId = ?, title = ?, description = ?, url = ?, thumbnailUrl = ?, duration = ?, price = ?, display_order = ? WHERE id = ?",
    [
      safeUpdateData.lessonId,
      safeUpdateData.title,
      safeUpdateData.description,
      safeUpdateData.url,
      safeUpdateData.thumbnailUrl,
      safeUpdateData.duration,
      safeUpdateData.price,
      safeUpdateData.display_order,
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

// NUEVA FUNCIÓN: Reordenar videos después de una eliminación (opcional)
export const reorderVideosAfterDeletion = async (lessonId: number): Promise<void> => {
  const client = getTursoClient();
  
  // Obtener todos los videos de la lección ordenados por display_order actual
  const videos = await getVideosByLesson(lessonId);
  
  // Reasignar display_order secuencialmente
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];
    
    // Verificar que el video tenga un ID válido
    if (video.id === undefined || video.id === null) {
      console.warn('Video sin ID válido, saltando:', video);
      continue;
    }
    
    await client.execute(
      "UPDATE CourseVideos SET display_order = ? WHERE id = ?",
      [i + 1, video.id] // ← Ahora video.id está verificado
    );
  }
};