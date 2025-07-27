import {
  CreateUserRequest,
  CustomResponse,
  GetUserParams,
} from "../types/express";
import * as UserService from "../services/userService";
import { hashedPassword } from "../utils/hashPassword";
import * as instructorService from "../services/instructorService";
import * as userRoleService from "../services/userRolesService";

export const createUser = async (
  req: CreateUserRequest,
  res: CustomResponse
) => {
  try {
    const { username, email, password, uId, photo } = req.body;
    if (!username || !email || !password || !uId) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Field username, email, password, uId are required",
      });
    }
    const passwordHashed = await hashedPassword(password);
    const newUser = await UserService.createUser({
      username,
      email,
      password: passwordHashed,
      createdAt: new Date(),
      uId,
      photo: photo || "",
      status: true,
    });

    res.status(201).json({
      success: true,
      user: newUser,
      message: "Usuario registrado correctamente.",
    });
  } catch (error) {
    console.error("Error al registrar instructor: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create user as instructor",
    });
  }
};

export const createInstructorUser = async (
  req: CreateUserRequest,
  res: CustomResponse
) => {
  try {
    const { username, email, password, uId, photo } = req.body;
    if (!username || !email || !password || !uId) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Field username, email, password, uId are required",
      });
    }
    const passwordHashed = await hashedPassword(password);
    const newUser = await UserService.createUser({
      username,
      email,
      password: passwordHashed,
      createdAt: new Date(),
      uId,
      photo: photo || "",
      status: true,
    });

    const newInstructor = await instructorService.createInstructor({
      name: username || "Instructor sin nombre",
      biography: "Biografía por defecto", 
      phone: "000-000-000", 
      createdAt: new Date(),
      userId: newUser.id!,
    });

    // 3. Asignar rol de instructor (asumimos que roleId 2 = instructor)
    const newUserRole = await userRoleService.createUsuarioRole({
      userId: newUser.id!,
      roleId: 2,
    });

    res.status(201).json({
      success: true,
      user: newUser,
      instructor: newInstructor,
      role: newUserRole,
      message: "Usuario registrado como instructor correctamente.",
    });
  } catch (error) {
    console.error("Error al registrar instructor: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create user as instructor",
    });
  }
};

export const getAllUsers = async (
  _req: CreateUserRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();

    if (!users || users.length === 0) {
      res.status(404).json({
        success: false,
        error: "UsersNotFound",
        message: "No se encontraron usuarios en la base de datos",
        details: {
          suggestion: "Verifique si hay usuarios registrados",
          timestamp: new Date().toISOString(),
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: users,
      message: "Usuarios obtenidos exitosamente",
      count: users.length,
      pagination: {
        total: users.length,
        returned: users.length,
      },
    });
  } catch (error) {
    console.error("[UsersController] Error al obtener usuarios:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener usuarios";

    res.status(500).json({
      success: false,
      error: "DatabaseError",
      message: "Error interno del servidor",
      details: {
        technical: errorMessage,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId,
      },
    });
  }
};

export const getUserByEmail = async (
  req: GetUserParams,
  res: CustomResponse
): Promise<void> => {
  try {
    const { email } = req.params;
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "UserNotFound",
        message: `No user found with email: ${email}`,
      });
    }

    res.status(200).json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to retrieve user by email",
    });
  }
};
