import { getTursoClient } from "../config/db";
import { CourseDocument, CourseDocumentUpdate } from "../models/CourseDocument";

export const getAllCourseDocuments = async (): Promise<CourseDocument[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM CourseDocuments");
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
  doc: Omit<CourseDocument, "id" | "createdAt">
): Promise<CourseDocument> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO CourseDocuments (title, description, fileurl, thumbnailUrl, price, lessonid, createdat) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      doc.title,
      doc.description,
      doc.fileUrl,
      doc.thumbnailUrl,
      doc.price,
      doc.lessonId,
      new Date().toISOString(),
    ]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...doc,
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