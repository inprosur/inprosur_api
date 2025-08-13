import { Request, Response } from "express";

/// Custom response interface to extend Express Response
export interface CustomResponse extends Response {
  status: (code: number) => this;
  json: (body: any) => this;
}

/// Request interface for handling ID parameters
export interface RequestWithIdParams extends Request {
  params: { id: string };
}

export interface RequestWithLessonId extends Request {
  query: {
    lessonId: string;
  };
}

export interface CourseVideoUpdate {
  lessonId?: number;
  title?: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  duration?: string;
  price?: number;
}

interface RegisterInstructorBody {
  username: string;
  email: string;
  password: string;
  uId: string;
  photo?: string;
  biography?: string;
  phone?: string;
}

export interface RegisterInstructorRequest extends Request {
  body: RegisterInstructorBody;
}

interface CommissionBody {
  instructorId: number;
  percentage: number;
}

interface UserRoleBody {
  userId: number;
  roleId: number;
}

interface NotificationBody {
  destination: "students" | "instructors";
  message: string;
  studentId?: number;
  instructorId: number;
}

interface AdvertisingBody {
  imgUrl: string;
  externalUrl: string;
  courseId: number;
  status: boolean;
}

interface CreateRoleBody {
  name: string;
  description: string;
  permissionId: number;
}

interface CreatePermissionBody {
  name: string;
  description: string;
}

interface CreateInstructorBody {
  name: string;
  biography: string;
  phone: string;
  userId: number;
}

interface CreateDegreeBody {
  name: string;
  description: string;
}

interface CreatePromotionBody {
  courseId: number;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  status: boolean;
}

interface CreateCourseDocumentBody {
  title: string;
  description: string;
  fileUrl: string;
  lessonId: number;
  price: number;
}

interface CreateCourseVideoBody {
  lessonId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  price: number;
  duration: string;
  description: string;
}

interface CreateCommissionBody {
  instructorId: number;
  courseId: number;
  videoId: number;
  documentId: number;
  commissionPercentage: number;
  commissionAmount: number;
}

interface CreatePaymentHistoryBody {
  studentId: number;
  courseId: number;
  videoId: number;
  documentId: number;
  amount: number;
}

interface CreateAccessLogBody {
  accessType: string;
  studentId: number;
  courseId: number;
  videoId: number;
  documentId: number;
}

interface CreateStudentBody {
  name: string;
  address: string;
  phone: string;
  fingerprint: string;
  userId: number;
}

interface CreateCourseBody {
  title: string;
  description: string;
  instructorId: number;
  categoryId?: number;
  price: number;
  isPublished: boolean;
  state: boolean;
  duration?: number;
  thumbnailUrl?: string;
}

interface UpdateCourseBody extends Partial<CreateCourseBody> {}

interface CreateCategoryBody {
  name: string;
  degreeId: number;
}

interface CreateCourseRatingBody {
  studentId: number;
  courseId: number;
  rating: number;
}

interface CreateEnrollmentBody {
  studentId: number;
  courseId: number;
  amount: number;
  status: boolean;
}

interface CreateUserBody {
  username: string;
  email: string;
  password: string;
  uId: string;
  photo?: string;
}

interface UpdateUserBody {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface CreateLessonBody {
  courseId: number;
  title: string;
  description: string;
  price: number;
  state: boolean;
}

interface UpdateLessonBody extends Partial<CreateLessonBody> {}

export interface CreateLessonRequest extends Request {
  body: CreateLessonBody;
}

export interface UpdateLessonRequest extends Request {
  params: { id: string };
  body: UpdateLessonBody;
}

export interface SearchRequest extends Request {
  query: {
    term?: string;
  };
  params: {
    categoryId?: string;
  };
}

export interface UpdateCourseRequest extends Request {
  params: { id: string };
  body: UpdateCourseBody;
}

export interface DeleteCourseRequest extends Request {
  params: { id: string };
}

export interface StudentByUserRequest extends Request {
  query: {
    userId: string;
  };
}

export interface InstructorByDegreeRequest extends Request {
  query: {
    degreeId: string;
  };
}

export interface GetUserParams extends Request {
  params: { id: string; email: string };
}

export interface CommissionRequest extends Request {
  body: CommissionBody;
}

export interface UserRolRequest extends Request {
  body: UserRoleBody;
}

export interface NotificationRequest extends Request {
  body: NotificationBody;
}

export interface AdvetisingRequest extends Request {
  body: AdvertisingBody;
}

export interface CreateRoleRequest extends Request {
  body: CreateRoleBody;
}

export interface PermissionRequest extends Request {
  body: CreatePermissionBody;
}

export interface InstructorRequest extends Request {
  body: CreateInstructorBody;
}

export interface DegreeRequest extends Request {
  body: CreateDegreeBody;
}

export interface PromotionRequest extends Request {
  body: CreatePromotionBody;
}

export interface CourseDocumentRequest extends Request {
  body: CreateCourseDocumentBody;
}

export interface CourseVideoRequest extends Request {
  body: CreateCourseVideoBody;
}

export interface CreateCommissionRequest extends Request {
  body: CreateCommissionBody;
}

export interface CreatePaymentHistoryRequest extends Request {
  body: CreatePaymentHistoryBody;
}

export interface CreateAccessLogRequest extends Request {
  body: CreateAccessLogBody;
}

export interface CreateStudentRequest extends Request {
  body: CreateStudentBody;
}

export interface CreateCourseRequest extends Request {
  body: CreateCourseBody;
}

export interface CreateCategoryRequest extends Request {
  body: CreateCategoryBody;
}

export interface CreateCourseRatingRequest extends Request {
  body: CreateCourseRatingBody;
}

export interface CreateEnrollmentRequest extends Request {
  body: CreateEnrollmentBody;
}

export interface CreateUserRequest extends Request {
  body: CreateUserBody;
}

export interface LoginRequest extends Request {
  body: LoginBody;
}

export interface UpdateUserRequest extends Request {
  body: UpdateUserBody;
}
