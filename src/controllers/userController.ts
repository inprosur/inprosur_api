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
