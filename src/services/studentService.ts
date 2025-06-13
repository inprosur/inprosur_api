import db from "../config/db";
import { Student } from "../models/Student";

export const createStudent = async (student: Student): Promise<Student> => {
  const result = await db.execute(
    "INSERT INTO Students (name, phone, address, fingerprint, userId, createdAt) VALUES(?, ?, ?, ?, ?, ?)",
    [
      student.name,
      student.phone,
      student.address,
      student.fingerprint || null,
      student.userId,
      student.createdAt.toISOString(),
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...student,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Student;
};

export const getAllStudents = async (): Promise<Student[]> => {
  const result = await db.execute("SELECT * FROM Students");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Student[];
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  const result = await db.execute("SELECT * FROM Students WHERE id=?", [id]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Student;
  } else {
    return null;
  }
};

export const getStudentByUserId = async (
  userId: number
): Promise<Student | null> => {
  const result = await db.execute("SELECT * FROM Students WHERE userId = ?", [
    userId,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  if (rows.length === 1) {
    return rows[0] as Student;
  } else {
    return null;
  }
};
