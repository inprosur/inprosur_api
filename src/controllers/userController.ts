import { Request, Response } from "express";
import * as UserService from "../services/userService";
import { hashedPassword } from "../utils/hashPassword";

// Función para obtener todos los usuarios usando el servicio de usuario
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    if (!users || users.length === 0) {
      res.status(404).json({
        error: "No users found",
        message: "No users found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: users,
      message: "Users retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch users",
    });
  }
};

// Función para obtener un usuario por su ID usando el servicio de usuario. Se espera que el ID sea un número entero y se maneja un error 400 si no lo es.
export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res
      .status(400)
      .json({ error: "Invalid user Id", message: "User ID must be a number" });
  } else {
    try {
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json({
          success: true,
          data: user,
          message: "User retrieved successfully.",
        });
      } else {
        res
          .status(404)
          .json({ error: "User not found", message: "User not found." });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch user",
      });
    }
  }
};

// Función para crear un nuevo usuario usando el servicio de usuario. Se espera que el cuerpo de las solicitud contenga los campos username, email y password. Se maneja un error 400 si faltan campos requeridos.
export const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Body is missing",
        message:
          "Request body is missing. Make sure to use express.json() middleware.",
      });
      return;
    }

    const { username, email, password, uId } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        error: "Missing required fields",
        mesage: "All the fileds are required",
      });
      return;
    }

    const newUser = await UserService.createUser({
      username,
      email,
      password: await hashedPassword(password),
      uId,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
