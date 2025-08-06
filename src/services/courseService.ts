import { getTursoClient } from "../config/db";
import { Course, CourseInstructor } from "../models/Course";

export const createCourse = async (course: Course): Promise<Course> => {
  const client = getTursoClient();
  const result = await client.execute(
    `INSERT INTO Courses 
      (title, description, creationDate, price, duration, isPublished, state, thumbnailUrl, instructorId, categoryId) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      course.title,
      course.description,
      course.creationDate?.toISOString() || new Date().toISOString(),
      course.price,
      course.duration || 0,
      course.isPublished ? 1 : 0,
      course.state ? 1 : 0,
      course.thumbnailUrl || null,
      course.instructorId,
      course.categoryId!,
    ]
  );

  const id = result.lastInsertRowid;

  return {
    ...course,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
};

export const getAllCourses = async (): Promise<Course[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Courses");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Course[];
};

export const getCourseById = async (id: number): Promise<Course | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Courses WHERE id=?", [id]);
  const row = Array.isArray(result) ? result[0] : result.rows;
  if (row.length == 1) {
    return row[0] as Course;
  } else {
    return null;
  }
};

export const getRecentsCreatedCourses = async (): Promise<Course[]> => {
  const client = getTursoClient();
  const result = await client.execute(`
    SELECT *
    FROM courses
    WHERE isPublished = true
    ORDER BY datetime(creationDate) DESC
    LIMIT 10
  `);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Course[];
};

export const updateCourse = async (
  id: number,
  updateData: Partial<Course>
): Promise<Course | null> => {
  const client = getTursoClient();

  // Filtramos los campos definidos (≠ undefined) y ≠ "id"
  const fields = Object.entries(updateData).filter(
    ([key, value]) => key !== "id" && value !== undefined
  );

  if (fields.length === 0) return null;

  const setClause = fields.map(([key]) => `${key} = ?`).join(", ");

  // Convertimos los valores al formato correcto y nos aseguramos de excluir undefined
  const values = fields.map(([key, value]) => {
    if (key === "isPublished") return value ? 1 : 0;
    if (key === "creationDate" && value instanceof Date)
      return value.toISOString();
    return value;
  });

  // Añadimos el ID al final del array de parámetros
  const queryParams = [...values, id] as (string | number | boolean | Date)[];

  const result = await client.execute(
    `UPDATE Courses SET ${setClause} WHERE id = ?`,
    queryParams
  );

  if (result.rowsAffected === 0) return null;

  return await getCourseById(id);
};

export const deleteCourse = async (id: number): Promise<boolean> => {
  const client = getTursoClient();
  const result = await client.execute("DELETE FROM Courses WHERE id = ?", [id]);
  return result.rowsAffected > 0;
};

export const getCoursesByInstructor = async (instructorId: string) => {
  const client = getTursoClient();
  const result = await client.execute(
    `
    SELECT c.*, cat.name as categoryName
    FROM Courses c
    JOIN Instructors i ON c.instructorId = i.id
    LEFT JOIN Categories cat ON c.categoryId = cat.id
    WHERE i.id = ?
    `,
    [instructorId]
  );

  return result.rows;
};

export const getCourseInstructor = async (courseId: number) => {
  const client = getTursoClient();
  const result = await client.execute(
    `
    SELECT
      c.id AS courseId,
      c.title AS courseTitle,
      c.description AS courseDescription,
      c.price AS coursePrice,
      c.isPublished AS courseIsPublished,
      c.duration AS courseDuration,
      c.thumbnailUrl AS courseThumbnailUrl,
      c.creationDate AS courseCreationDate,
      c.state AS courseState,
      c.categoryId AS courseCategoryId,
      c.creationDate AS courseCreationDate,
      i.id AS instructorId,
      i.name AS instructorName,
      i.biography AS instructorBiography,
      i.phone AS instructorPhone,
      i.createdAt AS instructorCreatedAt,
      i.userId AS instructorUserId,
      u.photo AS instructorPhoto
    FROM
      Courses c
    JOIN Instructors i ON c.instructorId = i.id
    JOIN Users u ON i.userId = u.id
    WHERE
      c.id = ?`,
    [courseId]
  );
  const rows = result.rows;
  if (rows.length === 0) return null;
  const row = rows[0];

  if (!row.instructorId) return null; // Si no hay instructor asociado
  const courseInstructor: CourseInstructor = {
    id: row.courseId as number,
    title: row.courseTitle as string,
    description: row.courseDescription as string,
    price: row.coursePrice as number,
    isPublished: (row.courseIsPublished as number) === 1 ? true : false,
    duration: row.courseDuration as number,
    thumbnailUrl: (row.courseThumbnailUrl as string) || undefined,
    creationDate: new Date(row.courseCreationDate as string),
    state: (row.courseState as number) === 1 ? true : false,
    categoryId: row.courseCategoryId as number,
    instructorId: row.instructorId as number,
    photoInstructor: row.instructorPhoto as string,
    instructor: {
      id: row.instructorId as number,
      name: row.instructorName as string,
      biography: row.instructorBiography as string,
      phone: row.instructorPhone as string,
      createdAt: new Date(row.instructorCreatedAt as string),
      userId: row.instructorUserId as number,
    },
  };

  return courseInstructor;
};
