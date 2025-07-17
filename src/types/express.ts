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

export interface CommissionRequest extends Request {
  body: CommissionBody;
}

export interface UserRolRequest extends Request {
  body: UserRoleBody;
}
