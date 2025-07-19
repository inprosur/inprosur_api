import * as UserService from "../services/userService";
import { hashedPassword } from "../utils/hashPassword";
import { CreateUserRequest, CustomResponse } from "../types/express";

export const createUser = async (
  req: CreateUserRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { username, email, password, uId, photo } = req.body;

    // Crear usuario con valores por defecto
    const newUser = await UserService.createUser({
      username,
      email,
      password: await hashedPassword(password),
      uId,
      photo: photo ?? "",
      status: true,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        status: newUser.status,
      },
    });
    return; // Añadido return explícito
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      error: "Error interno",
      message: "No se pudo registrar el usuario",
    });
    return; // Añadido return explícito
  }
};

export const getAllUsers = async (
  _req: CreateUserRequest,
  res: CustomResponse
): Promise<void> => {
  // El guión bajo indica que es intencionalmente no usado
  try {
    const users = await UserService.getAllUsers();

    if (!users || users.length === 0) {
      res.status(404).json({
        success: false,
        message: "No se encontraron usuarios",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
