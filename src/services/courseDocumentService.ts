import { getTursoClient } from "../config/db";
import { CourseDocument } from "../models/CourseDocument";

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
    "INSERT INTO CourseDocuments (title, description, fileurl, price, courseid, createdat) VALUES (?, ?, ?, ?, ?, ?)",
    [
      doc.title,
      doc.description,
      doc.fileUrl,
      doc.price,
      doc.courseId,
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
