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
            endEnrollmentDate,
            amount, 
            paymentDate,
            status
        ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      enrollment.studentId,
      enrollment.courseId,
      new Date().toISOString(), // enrollmentDate automático
      new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(), // endEnrollmentDate automático a 1 año
      enrollment.amount,
      new Date().toISOString(), // paymentDate automático
      true, // status por defecto
    ]
  );
  const id = result.lastInsertRowid;
  if (id === undefined) {
    throw new Error("Failed to create enrollment, no ID returned");
  }
  if (getEnrollmentById(Number(id)) === null) {
    throw new Error("Enrollment not found after creation");
  } else {
    const enrollment = await getEnrollmentById(Number(id));
    return enrollment as Enrollment;
  }
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
