import { Request, Response } from "express";
import * as EnrollmentService from "../services/enrollmentService";

export const getAllEnrollments = async (_req: Request, res: Response) => {
  try {
    const enrollments = await EnrollmentService.getAllEnrollments();
    if (!enrollments || enrollments.length === 0) {
      res.status(404).json({
        error: "No enrollments found",
        message: "No enrollments found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: enrollments,
      message: "Enrollments retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch enrollments",
    });
  }
};

export const getEnrollmentById = async (req: Request, res: Response) => {
  const enrollmentId = parseInt(req.params.id);
  if (isNaN(enrollmentId)) {
    res.status(400).json({
      error: "Invalid enrollment ID",
      message: "Enrollment ID must be a number",
    });
  } else {
    try {
      const enrollment = await EnrollmentService.getEnrollmentById(
        enrollmentId
      );
      if (enrollment) {
        res.status(200).json({
          success: true,
          data: enrollment,
          message: "Enrollment retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Enrollment not found",
          message: "Enrollment not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching enrollment:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch enrollment",
      });
    }
  }
};

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Body is missing",
        message:
          "Request body is missing. Make sure to use express.json() middleware.",
      });
      return;
    }

    const { studentId, courseId, amount, status } = req.body;

    // Validación de campos requeridos
    if (!studentId || !courseId || amount === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "studentId, courseId, and amount are required",
      });
      return;
    }

    // Validación de que el estudiante y curso existan (opcional, recomendado)
    // (Podrías agregar validaciones SQL adicionales en el servicio)

    const newEnrollment = await EnrollmentService.createEnrollment({
      studentId,
      courseId,
      amount,
      status: status || false, // Valor por defecto
    });

    res.status(201).json({
      success: true,
      data: newEnrollment,
      message: "Enrollment created successfully.",
    });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create enrollment",
    });
  }
};

export const getStudentCourses = async (req: Request, res: Response) => {
  const enrollmentId = parseInt(req.params.id);
  if (isNaN(enrollmentId)) {
    res.status(400).json({
      error: "Invalid studentId",
      message: "Stundent ID  must be a number",
    });
  } else {
    try {
      const courses = await EnrollmentService.getStundentCourses(enrollmentId);
      if (!courses || courses.length === 0) {
        res.status(404).json({
          error: "Courses not founds",
          message: "No courses found in the database",
        });
        return;
      }
      res.status(200).json({
        succes: true,
        data: courses,
        message: "Courses retrieved succesfully.",
      });
    } catch (error) {
      console.error("Error fetching courses: ", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch courses",
      });
    }
  }
};
