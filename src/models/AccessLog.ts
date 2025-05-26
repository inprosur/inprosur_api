export interface AccessLog {
    id?: number;
    accessType: string;
    accessTime: Date;
    studentId: number;
    courseId?: number; 
    videoId?: number;  
    documentId?: number;
}