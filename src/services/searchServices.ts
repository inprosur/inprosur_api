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
      price,
      id as courseId
    FROM Courses
    WHERE (title LIKE ? OR description LIKE ?) 
      AND isPublished = 1
    
    UNION ALL
    
    SELECT 
      'video' as type,
      id,
      title,
      description,
      thumbnailUrl,
      price,
      courseId
    FROM CourseVideos
    WHERE (title LIKE ? OR description LIKE ?)
    
    UNION ALL
    
    SELECT 
      'document' as type,
      id,
      title,
      description,
      NULL as thumbnailUrl,
      price,
      courseId
    FROM CourseDocuments
    WHERE (title LIKE ? OR description LIKE ?)
    
    ORDER BY title
    LIMIT 20
  `,
    [term, term, term, term, term, term]
  );

  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as any;
};
