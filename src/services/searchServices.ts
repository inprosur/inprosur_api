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
      FROM Courses c
      WHERE c.categoryId = ?
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
      FROM CourseVideos cv
      JOIN Courses c ON cv.courseId = c.id
      WHERE c.categoryId = ?
      AND c.isPublished = true

      UNION ALL
      SELECT
        'document' AS type,
        cd.id,
        cd.title,
        cd.description,
        cd.thumbnailUrl,
        NULL AS url,
        cd.fileUrl
      FROM CourseDocuments cd
      JOIN Courses c ON cd.courseId = c.id
      WHERE c.categoryId = ?
      AND c.isPublished = true

      ORDER BY title
      `,
      [categoryId, categoryId, categoryId]
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
  FROM Courses c
  WHERE (c.title LIKE ? OR c.description LIKE ?)
  AND c.categoryId = ?
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
  FROM CourseVideos cv
  JOIN Courses c ON cv.courseId = c.id
  WHERE (cv.title LIKE ? OR cv.description LIKE ?)
  AND c.isPublished = true

  UNION ALL

  SELECT
    'document' AS type,
    cd.id,
    cd.title,
    cd.description,
    cd.thumbnailUrl,
    NULL AS url,
    cd.fileUrl
  FROM CourseDocuments cd
  JOIN Courses c ON cd.courseId = c.id
  WHERE (cd.title LIKE ? OR cd.description LIKE ?)
  AND c.isPublished = true

  ORDER BY title
  `,
      [term, term, categoryId, term, term, term, term]
    );
    const rows = Array.isArray(coursesFound)
      ? coursesFound[0]
      : coursesFound.rows;
    return rows as any[];
  }
};
