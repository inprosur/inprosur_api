export interface InstructorCommission {
    id?: number;
    instructorId: number;
    courseId?: number;
    videoId?: number;
    documentId?: number;
    commissionPercentage: number;
    commissionAmount: number;
    paymentDate?: Date;
}