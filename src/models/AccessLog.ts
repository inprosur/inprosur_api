export interface AccessLog {
    id: number;
    studentId: number;
    itemType: 'course' | 'video' | 'document';
    itemId: number;
    accessTime: Date;
}