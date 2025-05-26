export interface CourseVideo {
    id?: number;
    courseId: number;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    duration: string;
    price: number;
}