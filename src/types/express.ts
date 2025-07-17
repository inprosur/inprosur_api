import { Request } from "express";

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
