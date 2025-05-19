export interface Course {
    id: number;
    title: string;
    description: string;
    creation_date: string;
    instructor_id: number;
    category_id: number;
    subcategory_id: number;
    price: number;
    is_published: boolean;
    duration: number;
    thumbnail_url: string;
}