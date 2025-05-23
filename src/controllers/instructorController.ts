import { Request, Response } from "express";
import * as InstructorService from "../services/instructorService";

export const createInstructor = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Bad request",
        message: "Request body is required",
      });
      return;
    }

    const { name, biography, phone, userId } = req.body;
    if (!name || !biography || !phone || !userId) {
      res.status(400).json({
        error: "Bad request",
        message: "All fields are required",
      });
      return;
    }

    const instructor = { name, biography, phone, userId };
    const newInstructor = await InstructorService.createInstructor(instructor);
    res.status(201).json({
      success: true,
      data: newInstructor,
      message: "Instructor created successfully",
    });
  } catch (error) {
    console.error("Error creating instructor: ", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create instructor",
    });
  }
};

export const getAllInstructors = async (_req: Request, res: Response) => {
  try {
    const instructors = await InstructorService.getAllInstructors();
    if (!instructors || instructors.length === 0) {
      res.status(404).json({
        error: "No instructors found",
        message: "No instructors found in the database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: instructors,
      message: "Instructors retrieved successfully.",
    });
  } catch (error) {
    console.error("Error retrieving instructors:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve instructors.",
    });
  }
};

export const getInstructorById = async (req: Request, res: Response) => {
  try {
    const instructorId = Number(req.params.id);
    if (!Number.isInteger(instructorId) || instructorId <= 0) {
      res.status(400).json({
        error: "Invalid instructor ID",
        message: "Instructor ID must be a positive integer.",
      });
      return;
    }

    const instructor = await InstructorService.getInstructorById(instructorId);
    if (!instructor) {
      res.status(404).json({
        error: "Instructor not found",
        message: `No instructor found with ID ${instructorId}.`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: instructor,
      message: "Instructor retrieved successfully.",
    });
  } catch (error) {
    console.error("Error retrieving instructor:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "failed to retrieve instructor.",
    });
  }
};
