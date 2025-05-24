export interface Course {
  id?: number;
  title: string;
  description: string;
  instructorId: number;
  categoryId?: number;
  subcategoryId?: number;
  price: number;
  isPublished: boolean;
  duration?: string;
  thumbnailUrl?: string;
  creationDate: Date;
}
