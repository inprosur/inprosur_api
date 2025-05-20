export interface AccessLog {
    id?: number;
    studentId: number;
    itemType: 'course' | 'video' | 'document';
    courseId?: number;
    courseVideoId?: number;
    courseDocumentId?: number;
    accessTime: Date;
}