export interface CourseVideo {
    id?: number;
    lessonId: number;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    duration: string;
    price: number;
}

export interface CourseVideoUpdate {
  lessonId?: number;
  title?: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  duration?: string;
  price?: number;
}