export interface Enrollment {
  id?: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  endEnrollmentDate: Date;
  amount: number;
  paymentDate: Date;
  status: boolean;
}
