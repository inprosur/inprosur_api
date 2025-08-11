import { getTursoClient } from "../config/db";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";

export const getAllEnrollments = async (): Promise<Enrollment[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM enrollments");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Enrollment[];
};

export const getEnrollmentById = async (
  id: number
): Promise<Enrollment | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM enrollments WHERE id = ?",
    [id]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as Enrollment) : null;
};

export const createEnrollment = async (
  enrollment: Omit<
    Enrollment,
    "id" | "enrollmentDate" | "paymentDate" | "endEnrollmentDate"
  >
): Promise<Enrollment> => {
  const client = getTursoClient();
  const result = await client.execute(
    `INSERT INTO enrollments (
            studentId, 
            courseId, 
            enrollmentDate,
            amount, 
            paymentDate,
            status
        ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      enrollment.studentId,
      enrollment.courseId,
      new Date().toISOString(), // enrollmentDate automático
      enrollment.amount,
      new Date().toISOString(), // paymentDate automático
      enrollment.status || false, // Default: false
    ]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...enrollment,
    enrollmentDate: new Date(),
    endEnrollmentDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ),
    paymentDate: new Date(),
  };
};

export const getStundentCourses = async (
  studentId: number
): Promise<Course[]> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT c.* FROM Courses c INNER JOIN enrollments e ON c.id = e.courseId WHERE e.studentId = ?",
    [studentId]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Course[];
};
