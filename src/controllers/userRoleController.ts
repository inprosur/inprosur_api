import * as UserRolService from "../services/userRolesService";
import { CustomResponse, UserRolRequest } from "../types/express";

export const createUserRole = async (
  req: UserRolRequest,
  res: CustomResponse
) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({
        error: "Fields Missing",
        message: "userId and roleId are required.",
      });
    }

    const newUserRol = await UserRolService.createUsuarioRole({
      userId,
      roleId,
    });

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
