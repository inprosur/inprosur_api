export interface Lesson {
  id?: number;
  courseId: number;
  title: string;
  description: string;
  price: number;
  state: boolean;
  createdAt?: Date;
}