import { Request, Response } from "express";
import * as UserRolService from "../services/userRolesService";

interface CreateUserRoleBody {
  userId: number;
  roleId: number;
}

interface SuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

interface ErrorResponse {
  error: string;
  message: string;
}

type UserRoleResponse = SuccessResponse<any> | ErrorResponse;

export const createUserRole = async (
  req: Request<any, any, CreateUserRoleBody>,
  res: Response<UserRoleResponse>
): Promise<Response<UserRoleResponse>> => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({
        error: "Fields Missing",
        message: "userId and roleId are required.",
      });
    }

    const newUserRol = await UserRolService.createUsuarioRole({ userId, roleId });

    return res.status(201).json({
      success: true,
      data: newUserRol,
      message: "User role relationship created successfully.",
    });
  } catch (error) {
    console.error("Error creating user role:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to create user role relationship.",
    });
  }
};
