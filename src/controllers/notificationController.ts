import * as NotificationService from "../services/notificationService";
import { CustomResponse, NotificationRequest } from "../types/express";

export const createNotification = async (
  req: NotificationRequest,
  res: CustomResponse
) => {
  try {
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
      studentId,
      instructorId,
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
