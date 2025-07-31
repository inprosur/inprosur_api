import { getTursoClient } from "../config/db";
import { Instructor } from "../models/Instructor";

export const createInstructor = async (
  instructor: Instructor
): Promise<Instructor> => {
  const client = getTursoClient();
  const result = await client.execute(
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
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Instructors");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Instructor[];
};

export const getInstructorById = async (
  id: number
): Promise<Instructor | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Instructors WHERE id=?", [
    id,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Instructor;
  } else {
    return null;
  }
};

export const getPublicInstructors = async () => {
  const client = getTursoClient();
  const result = await client.execute(`
    SELECT 
      i.id AS instructorId,
      i.name AS instructorName,
      i.biography,
      i.phone,
      i.createdAt,
      u.username,
      u.email,
      u.photo
    FROM Instructors i
    JOIN Users u ON i.userId = u.id
  `);

  const rows = (Array.isArray(result) ? result[0] : result.rows) as any[];

return rows.map((row) => ({
  id: row.instructorId,
  name: row.instructorName,
  biography: row.biography,
  phone: row.phone,
  createdAt: row.createdAt,
  user: {
    username: row.username,
    email: row.email,
    photo: row.photo,
  },
}));
};
