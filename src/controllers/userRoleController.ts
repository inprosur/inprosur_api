import { Request, Response } from "express";
import * as UserRolService from "../services/userRolesService";

interface CreateUserRoleBody {
  userId: number;
  roleId: number;
}

export const createUserRole = async (req: Request<{}, {}, CreateUserRoleBody>, res: Response) => {
  try {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      res.status(400).json({
        error: "Fields Missing",
        message: "userId and roleId are required.",
      });
      return;
    }

    const newUserRol = await UserRolService.createUsuarioRole({
      userId,
      roleId,
    });
    res.status(201).json({
      success: true,
      data: newUserRol,
      message: "User role relationship created successfullly.",
    });
  } catch (error) {
    console.error("Error creating user role:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create user role relationship.",
    });
  }
};
