export interface CourseDocument {
  id?: number;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  price: number;
  courseId: number;
  createdAt?: Date;
}
