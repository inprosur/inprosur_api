import db from "../config/db";
import { Course } from "../models/Course";

export const createCourse = async (course: Course): Promise<Course> => {
  const result = await db.execute(
    "INSERT INTO Courses (title, description, creationDate, price, duration, isPublished, duration, thumbnailUrl, instructorId, categoryId, subcategoryId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      course.title,
      course.description,
      course.price,
      course.duration || null,
      course.isPublished ? 1 : 0,
      course.thumbnailUrl || null,
      course.instructorId,
      course.categoryId || null,
      course.subcategoryId || null,
      course.creationDate.toISOString(),
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...course,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Course;
};

export const getAllCourses = async (): Promise<Course[]> => {
  const result = await db.execute("SELECT * FROM Courses");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Course[];
};

export const getCourseById = async (id: number): Promise<Course | null> => {
  const result = await db.execute("SELECT * FROM Courses WHERE id=?", [id]);
  const row = Array.isArray(result) ? result[0] : result.rows;
  if (row.length == 1) {
    return row[0] as Course;
  } else {
    return null;
  }
};
