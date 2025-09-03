import { getVideosByLesson } from "./courseVideoService";
import { getDocumentsByLesson } from "./courseDocumentService";
import { CourseVideoUpdate } from "../models/CourseVideo";
import { CourseDocumentUpdate } from "../models/CourseDocument";
import { updateCourseVideo } from "./courseVideoService";
import { updateCourseDocument } from "./courseDocumentService";

export interface CombinedContentItem {
  id: number;
  type: 'video' | 'document';
  title: string;
  description: string;
  display_order: number;
  // aqui hay que poner otros campos comunes en caso de necesitar para reordenar 
}

export const getCombinedContentByLesson = async (lessonId: number): Promise<CombinedContentItem[]> => {
  const [videos, documents] = await Promise.all([
    getVideosByLesson(lessonId),
    getDocumentsByLesson(lessonId)
  ]);

  const combined = [
    ...videos.map(video => ({
      id: video.id!,
      type: 'video' as const,
      title: video.title,
      description: video.description,
      display_order: video.display_order
    })),
    ...documents.map(doc => ({
      id: doc.id!,
      type: 'document' as const,
      title: doc.title,
      description: doc.description,
      display_order: doc.display_order
    }))
  ];

  return combined.sort((a, b) => a.display_order - b.display_order);
};

export const updateContentOrder = async (updates: Array<{
  id: number;
  type: 'video' | 'document';
  display_order: number;
}>): Promise<void> => {
  
  const updatePromises = updates.map(update => {
    if (update.type === 'video') {
      const videoUpdate: CourseVideoUpdate = { display_order: update.display_order };
      return updateCourseVideo(update.id, videoUpdate);
    } else {
      const docUpdate: CourseDocumentUpdate = { display_order: update.display_order };
      return updateCourseDocument(update.id, docUpdate);
    }
  });

  await Promise.all(updatePromises);
};