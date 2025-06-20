import db from "../config/db";

export const searchCourses = async (term: string) => {
  const result = await db.execute(
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
    WHERE (title LIKE ? OR description LIKE ?) AND isPublished = 1

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
