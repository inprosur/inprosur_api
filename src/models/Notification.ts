export interface Notification {
  id?: number;
  destination: "students" | "instructors";
  message: string;
  studentId?: number;
  instructorId?: number;
  status?: boolean;
  date: Date;
}
