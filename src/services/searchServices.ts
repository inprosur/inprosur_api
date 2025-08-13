import { getTursoClient } from "../config/db";

export const searchCourses = async (term: string) => {
  const client = getTursoClient();
  const result = await client.execute(
    `
    SELECT
      'course' as type,
      id,
      title,
      description,
      thumbnailUrl,
      NULL as url,
      NULL as fileUrl
    FROM Courses
    WHERE (title LIKE ? OR description LIKE ?) AND isPublished = true

    UNION ALL

    SELECT
      'video' as type,
      id,
      title,
      description,
      thumbnailUrl,
      url,
      NULL as fileUrl
    FROM CourseVideos
    WHERE title LIKE ? OR description LIKE ?

    UNION ALL

    SELECT
      'document' as type,
      id,
      title,
      description,
      NULL as thumbnailUrl,
      NULL as url,
      fileUrl
    FROM CourseDocuments
    WHERE title LIKE ? OR description LIKE ?
    ORDER BY type, title
    `,
    [term, term, term, term, term, term]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as any[];
};

export const searchCoursesByCategory = async (
  categoryId: number,
  term: string
) => {
  const client = getTursoClient();
  if (!term || term.trim() === "") {
    const coursesFound = await client.execute(
      `SELECT
      'course' AS type,
      c.id,
      c.title,
      c.description,
      c.thumbnailUrl,
      NULL AS url,
      NULL AS fileUrl
    FROM
      Courses c
    WHERE
      c.categoryId = ?
      AND c.state = true
      AND c.isPublished = true
    UNION ALL
    SELECT
      'lesson' AS type,
      l.id,
      l.title,
      l.description,
      NULL AS thumbnailUrl,
      NULL AS url,
      NULL AS fileUrl
    FROM
      Lessons l
      JOIN Courses c ON l.courseId = c.id
    WHERE
      c.categoryId = ?
      AND l.state = true
      AND c.isPublished = true
    UNION ALL
    SELECT
      'video' AS type,
      cv.id,
      cv.title,
      cv.description,
      cv.thumbnailUrl,
      cv.url,
      NULL AS fileUrl
    FROM
      CourseVideos cv
      JOIN Lessons l ON cv.lessonId = l.id
    WHERE
      cv.lessonId = l.id
      AND l.state = true
    UNION ALL
    SELECT
      'document' AS type,
      cd.id,
      cd.title,
      cd.description,
      cd.thumbnailUrl,
      NULL AS url,
      cd.fileUrl
    FROM
      CourseDocuments cd
      JOIN Lessons l ON cd.lessonId = l.id
    WHERE
      cd.lessonId = l.id
      AND l.state = true
    ORDER BY
      title
      `,
      [categoryId]
    );
    const rows = Array.isArray(coursesFound)
      ? coursesFound[0]
      : coursesFound.rows;
    return rows as any[];
  } else {
    const coursesFound = await client.execute(
      `SELECT
      'course' AS type,
      c.id,
      c.title,
      c.description,
      c.thumbnailUrl,
      NULL AS url,
      NULL AS fileUrl
    FROM
      Courses c
    WHERE
      (
        c.title LIKE ?
        OR c.description LIKE ?
      )
      AND c.categoryId = ?
      AND c.state = true
      AND c.isPublished = true
    UNION ALL
    SELECT
      'lesson' AS type,
      l.id,
      l.title,
      l.description,
      NULL AS thumbnailUrl,
      NULL AS url,
      NULL AS fileUrl
    FROM
      Lessons l
      JOIN Courses c ON l.courseId = c.id
    WHERE
      (
        l.title LIKE ?
        OR l.description LIKE ?
      )
      AND l.state = true
      AND c.isPublished = true
    UNION ALL
    SELECT
      'video' AS type,
      cv.id,
      cv.title,
      cv.description,
      cv.thumbnailUrl,
      cv.url,
      NULL AS fileUrl
    FROM
      CourseVideos cv
      JOIN Lessons l ON cv.lessonId = l.id
    WHERE
      (
        cv.title LIKE ?
        OR cv.description LIKE ?
      )
      AND l.state = true
    UNION ALL
    SELECT
      'document' AS type,
      cd.id,
      cd.title,
      cd.description,
      cd.thumbnailUrl,
      NULL AS url,
      cd.fileUrl
    FROM
      CourseDocuments cd
      JOIN Lessons l ON cd.lessonId = l.id
    WHERE
      (
        cd.title LIKE ?
        OR cd.description LIKE ?
      )
      AND l.state = true
    ORDER BY
      title`,
      [term, term, categoryId, term, term, term, term, term, term]
    );
    const rows = Array.isArray(coursesFound)
      ? coursesFound[0]
      : coursesFound.rows;
    return rows as any[];
  }
};
