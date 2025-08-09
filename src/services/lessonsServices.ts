import { getTursoClient } from "../config/db";
import { Lesson } from "../models/Lesson";

export const createLesson = async (lesson: Omit<Lesson, 'id' | 'createdAt'>): Promise<Lesson> => {
  
  if (!lesson.courseId || !lesson.title || lesson.price === undefined) {
    throw new Error('Missing required fields');
  }

  const client = getTursoClient();
  try {
    const result = await client.execute(
      `INSERT INTO Lessons (courseId, title, description, price, state, createdAt) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        lesson.courseId,
        lesson.title,
        lesson.description ?? null,
        lesson.price,
        lesson.state ? 1 : 0,
        new Date().toISOString()
      ]
    );

    return {
      ...lesson,
      id: Number(result.lastInsertRowid),
      createdAt: new Date(),
      state: Boolean(lesson.state)
    };
  } catch (error) {
    throw new Error(`Failed to create lesson: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const getLessonsByCourse = async (courseId: number): Promise<Lesson[]> => {
  if (!courseId || isNaN(courseId)) {
    throw new Error('Invalid course ID');
  }

  const client = getTursoClient();
  try {
    const result = await client.execute(
      "SELECT * FROM Lessons WHERE courseId = ? ORDER BY createdAt ASC",
      [courseId]
    );

    return result.rows.map(row => ({
      id: row.id as number,
      courseId: row.courseId as number,
      title: row.title as string,
      description: row.description as string,
      price: row.price as number,
      state: Boolean(row.state),
      createdAt: row.createdAt ? new Date(row.createdAt as string) : undefined
    }));
  } catch (error) {
    throw new Error(`Failed to fetch lessons: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const updateLesson = async (
  id: number,
  updateData: Partial<Lesson>
): Promise<Lesson | null> => {
  const client = getTursoClient();
  const fields = Object.entries(updateData)
    .filter(([_, value]) => value !== undefined);

  if (fields.length === 0) return null;

  const setClause = fields.map(([key]) => `${key} = ?`).join(", ");
  const values = fields.map(([_, value]) => value);

  await client.execute(
    `UPDATE Lessons SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  return getLessonById(id);
};

export const getLessonById = async (id: number): Promise<Lesson | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Lessons WHERE id = ?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  
  return rows.length
    ? {
        id: rows[0].id,
        courseId: rows[0].courseId,
        title: rows[0].title,
        description: rows[0].description,
        price: rows[0].price,
        state: Boolean(rows[0].state),
        createdAt: rows[0].createdAt ? new Date(rows[0].createdAt) : undefined
      }
    : null;
};

export const deleteLesson = async (id: number): Promise<boolean> => {
  if (!id || isNaN(id)) {
    throw new Error('Invalid lesson ID');
  }

  const client = getTursoClient();
  try {
    const result = await client.execute("DELETE FROM Lessons WHERE id = ?", [id]);
    return result.rowsAffected > 0;
  } catch (error) {
    throw new Error(`Failed to delete lesson: ${error instanceof Error ? error.message : String(error)}`);
  }
};