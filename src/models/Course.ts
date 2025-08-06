import { Instructor } from "./Instructor";

export interface Course {
  id?: number;
  title: string;
  description: string;
  instructorId: number;
  categoryId: number;
  price: number;
  isPublished: boolean;
  state: boolean;
  duration?: number;
  thumbnailUrl?: string;
  creationDate: Date;
}

export interface CourseInstructor extends Course {
  instructor: Instructor;
  photoInstructor?: string;
}
