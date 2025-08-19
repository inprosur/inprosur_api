export interface CourseDocument {
  id?: number;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string;
  price: number;
  lessonId: number;
  createdAt?: Date;
}

export interface CourseDocumentUpdate {
  title?: string;
  description?: string;
  fileUrl?: string;
  thumbnailUrl?: string | null; 
  price?: number;
  lessonId?: number;
}