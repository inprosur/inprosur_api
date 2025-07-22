import { CreateUserRequest, CustomResponse } from "../types/express";
import * as UserService from "../services/userService";
import { hashedPassword } from "../utils/hashPassword";

export const createUser = async (
  req: CreateUserRequest,
  res: CustomResponse
) => {
  try {
    const { username, email, password, uId, photo } = req.body;
    if (!username || !email || !password || !uId) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Field usernamr, email, password, uId are required",
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
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create user",
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
          timestamp: new Date().toISOString()
        }
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
        returned: users.length
      }
    });
  } catch (error) {
    console.error("[UsersController] Error al obtener usuarios:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Error desconocido al obtener usuarios";
    
    res.status(500).json({
      success: false,
      error: "DatabaseError",
      message: "Error interno del servidor",
      details: {
        technical: errorMessage,
        timestamp: new Date().toISOString(),
        requestId: res.locals.requestId // Asumiendo que tienes un requestId
      }
    });
  }
};