import {
  CreateEnrollmentRequest,
  CustomResponse,
  RequestWithIdParams,
  StudenteEnrolledInCourseRequest,
} from "../types/express";
import * as EnrollmentService from "../services/enrollmentService";

export const getAllEnrollments = async (
  _req: CreateEnrollmentRequest,
  res: CustomResponse
) => {
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

export const getEnrollmentById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
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

export const createEnrollment = async (
  req: CreateEnrollmentRequest,
  res: CustomResponse
) => {
  try {
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

export const getStudentCourses = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
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

export const studentEnrolledInCourse = async (
  req: StudenteEnrolledInCourseRequest,
  res: CustomResponse
) => {
  const { studentId, courseId } = req.query;
  if (!studentId || !courseId) {
    res.status(400).json({
      error: "Bad request",
      message: "Both studentId and courseId are required.",
    });
    return;
  }
  if (isNaN(Number(studentId)) || isNaN(Number(courseId))) {
    res.status(400).json({
      error: "Invalid parameters",
      message: "Both studentId and courseId must be numbers.",
    });
    return;
  }
  try {
    const isEnrolled = await EnrollmentService.studenteEnrolledInCourse(
      Number(studentId),
      Number(courseId)
    );
    res.status(200).json({
      success: true,
      data: isEnrolled,
      message: "Enrollment status retrieved successfully.",
    });
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to check enrollment status.",
    });
  }
};
