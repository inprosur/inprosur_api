import { getTursoClient } from "../config/db";
import { CourseDocument, CourseDocumentUpdate } from "../models/CourseDocument";

export const getAllCourseDocuments = async (): Promise<CourseDocument[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM CourseDocuments ORDER BY lessonId, display_order");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as CourseDocument[];
};

export const getCourseDocumentById = async (
  id: number
): Promise<CourseDocument | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM CourseDocuments WHERE id = ?",
    [id]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as CourseDocument) : null;
};

export const createCourseDocument = async (
  doc: Omit<CourseDocument, "id" | "createdAt" | "display_order">
): Promise<CourseDocument> => {
  const client = getTursoClient();
  
  // Obtener el próximo display_order automáticamente (usando la misma función auxiliar)
  const display_order = await getNextDisplayOrder(doc.lessonId);
  
  const result = await client.execute(
    "INSERT INTO CourseDocuments (title, description, fileurl, thumbnailUrl, price, lessonid, createdat, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      doc.title,
      doc.description,
      doc.fileUrl,
      doc.thumbnailUrl,
      doc.price,
      doc.lessonId,
      new Date().toISOString(),
      display_order
    ]
  );
  
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...doc,
    display_order,
    createdAt: new Date(),
  };
};

export const updateCourseDocument = async (
  id: number,
  doc: CourseDocumentUpdate
): Promise<boolean> => {
  const client = getTursoClient();

  // Validar que al menos un campo sea proporcionado
  if (Object.keys(doc).length === 0) {
    throw new Error("No fields provided for update");
  }

  // Construir consulta dinámica
  const fieldsToUpdate: string[] = [];
  const values: any[] = [];

  if (doc.title !== undefined) {
    fieldsToUpdate.push("title = ?");
    values.push(doc.title);
  }
  if (doc.description !== undefined) {
    fieldsToUpdate.push("description = ?");
    values.push(doc.description);
  }
  if (doc.fileUrl !== undefined) {
    fieldsToUpdate.push("fileUrl = ?");
    values.push(doc.fileUrl);
  }
  if (doc.thumbnailUrl !== undefined) {
    fieldsToUpdate.push("thumbnailUrl = ?");
    values.push(doc.thumbnailUrl);
  }
  if (doc.price !== undefined) {
    fieldsToUpdate.push("price = ?");
    values.push(doc.price);
  }
  if (doc.lessonId !== undefined) {
    fieldsToUpdate.push("lessonId = ?");
    values.push(doc.lessonId);
  }
  if (doc.display_order !== undefined) {
    fieldsToUpdate.push("display_order = ?");
    values.push(doc.display_order);
  }

  if (fieldsToUpdate.length === 0) {
    throw new Error("No valid fields provided for update");
  }

  values.push(id); // Para el WHERE id = ?

  const query = `UPDATE CourseDocuments SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
  
  const result = await client.execute(query, values);
  return result.rowsAffected > 0;
};

export const deleteCourseDocument = async (id: number): Promise<boolean> => {
  const client = getTursoClient();
  const result = await client.execute(
    "DELETE FROM CourseDocuments WHERE id = ?",
    [id]
  );
  return result.rowsAffected > 0;
};

export const getDocumentsByLesson = async (lessonId: number): Promise<CourseDocument[]> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM CourseDocuments WHERE lessonId = ? ORDER BY display_order",
    [lessonId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as CourseDocument[];
};

// NUEVA FUNCIÓN: Reordenar documentos después de una eliminación (opcional)
export const reorderDocumentsAfterDeletion = async (lessonId: number): Promise<void> => {
  const client = getTursoClient();
  
  // Obtener todos los documentos de la lección ordenados por display_order actual
  const documents = await getDocumentsByLesson(lessonId);
  
  // Reasignar display_order secuencialmente
  for (let i = 0; i < documents.length; i++) {
    const document = documents[i];
    
    // Verificar que el documento tenga un ID válido
    if (document.id === undefined || document.id === null) {
      console.warn('Documento sin ID válido, saltando:', document);
      continue;
    }
    
    await client.execute(
      "UPDATE CourseDocuments SET display_order = ? WHERE id = ?",
      [i + 1, document.id] // ← Ahora document.id está verificado
    );
  }
};

// FUNCIÓN AUXILIAR: Obtener el próximo display_order para una lección (la misma que en video service)
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