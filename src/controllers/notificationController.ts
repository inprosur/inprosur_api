import { Request, Response } from "../types/express";
import * as NotificationService from "../services/notificationService";

export const createNotification = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Bad request",
        message: "Request body is required",
      });
      return;
    }

    const { destination, studentId, instructorId, message } = req.body;
    if (!destination || !message) {
      res.status(400).json({
        error: "Bad request",
        message: "All fields are required",
      });
      return;
    }

    const newNotification = await NotificationService.createNotification({
      destination,
      message,
      studentId: studentId !== undefined ? studentId : null,
      instructorId: instructorId !== undefined ? instructorId : null,
      status: true,
      date: new Date(),
    });
    res.status(201).json({
      success: true,
      data: newNotification,
      message: "Notification created successfully",
    });
  } catch (error) {
    console.error("Error creating notification: ", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create notification",
    });
  }
};
