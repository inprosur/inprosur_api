export interface PaymentHistory {
    id?: number;
    studentId: number;
    courseId?: number;
    videoId?: number;
    documentId?: number;
    amount: number;
    paymentDate: Date;
}