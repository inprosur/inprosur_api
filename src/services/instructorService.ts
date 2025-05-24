import db from "../config/db";
import { Instructor } from "../models/Instructor";

export const createInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  const result = await db.execute(
    "INSERT INTO Instructors (name, biography, phone, createdAt, userId) VALUES(?, ?, ?, ?, ?)",
    [
      instructor.name,
      instructor.biography,
      instructor.phone,
      instructor.createdAt.toISOString(),
      instructor.userId,
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...instructor,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Instructor;
};

export const getAllInstructors = async (): Promise<Instructor[]> => {
  const result = await db.execute("SELECT * FROM Instructors");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Instructor[];
};

export const getInstructorById = async (
  id: number
): Promise<Instructor | null> => {
  const result = await db.execute("SELECT * FROM Instructors WHERE id=?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Instructor;
  } else {
    return null;
  }
};
