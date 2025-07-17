import { Request, Response } from "express";

export interface CustomResponse extends Response {
  status: (code: number) => this;
  json: (body: any) => this;
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

export interface SearchRequest extends Request {
  query: {
    term?: string;
  };
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
