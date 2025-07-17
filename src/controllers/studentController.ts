import { Request } from "express";
import { CustomResponse } from "../types/express";
import * as StudentService from "../services/studentService";

export const createStudent = async (req: Request, res: CustomResponse) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Bad request",
        message: "Request body is required",
      });
      return;
    }

    const { name, phone, address, fingerprint, userId } = req.body;
    if (!name || !address || !phone || !userId) {
      res.status(400).json({
        error: "Bad request",
        message: "All fields are required",
      });
      return;
    }

    const student = {
      name,
      phone,
      address,
      fingerprint: fingerprint || null,
      createdAt: new Date(),
      userId,
    };
    const newStudent = await StudentService.createStudent(student);
    res.status(201).json({
      success: true,
      data: newStudent,
      message: "Student created successfully",
    });
  } catch (error) {
    console.error("Error creating student: ", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create student",
    });
  }
};

export const getAllStudents = async (_req: Request, res: CustomResponse) => {
  try {
    const students = await StudentService.getAllStudents();
    if (!students || students.length === 0) {
      res.status(404).json({
        error: "No students found",
        message: "No students found in the database.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: students,
      message: "Students retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch students",
    });
  }
};

interface StudentIdParams {
  id: string;
}

export const getStudentById = async (req: Request<StudentIdParams>, res: CustomResponse) => {
  try {
    const studentId = parseInt(req.params.id);
    if (!studentId) {
      res.status(400).json({
        error: "Bad request",
        message: "Student ID is required.",
      });
      return;
    }

    const student = await StudentService.getStudentById(studentId);
    if (!student) {
      res.status(404).json({
        error: "Not found",
        message: "Student not found.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: student,
      message: "Student retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch student",
    });
  }
};

export const getStudentByUserId = async (req: Request, res: CustomResponse) => {
  try {
    const userId = parseInt(req.query.userId as string);
    if (!userId || isNaN(userId)) {
      res.status(400).json({
        error: "Bad request",
        message: "User ID is required.",
      });
      return;
    }
    const student = await StudentService.getStudentByUserId(userId);
    if (!student) {
      res.status(200).json({
        success: true,
        data: null,
        message: "Student not found.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: student,
      message: "Student retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching student by userId: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch student by userId.",
    });
  }
};
