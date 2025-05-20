export interface CourseDocument {
    id: number;
    courseId: number;
    title: string;
    description: string;
    fileUrl: string;
    price: number;
    createdAt: Date;
}