export interface Promotion {
    id: number;
    courseId: number;
    startDate: Date;
    endDate: Date;
    discountPercentage: number;
    status: boolean;
}