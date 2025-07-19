import {
  CreateCourseRequest,
  CustomResponse,
  RequestWithIdParams,
} from "../types/express";
import * as CourseService from "../services/courseService";

export const createCourse = async (
  req: CreateCourseRequest,
  res: CustomResponse
) => {
  try {
    const {
      title,
      description,
      instructorId,
      categoryId,
      price,
      isPublished,
      duration,
      thumbnailUrl,
    } = req.body;

    if (
      !title ||
      !description ||
      !instructorId ||
      !price ||
      !isPublished ||
      !categoryId
    ) {
      res.status(400).json({
        error: "Missing required fields",
        message:
          "title, description, instructorId, price, isPublished and categoryId are required",
      });
      return;
    }

    const newCourse = await CourseService.createCourse({
      title,
      description,
      instructorId,
      categoryId,
      price,
      isPublished,
      duration,
      thumbnailUrl,
      creationDate: new Date(),
    });

    res.status(201).json({
      success: true,
      data: newCourse,
      message: "Course created successfully.",
    });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create the Course.",
    });
  }
};

export const getAllCourses = async (
  _req: CreateCourseRequest,
  res: CustomResponse
) => {
  try {
    const courses = await CourseService.getAllCourses();
    if (!courses) {
      res.status(404).json({
        error: "No courses found",
        message: "No courses found in the database.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: courses,
      message: "Courses retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching courses: ", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch courses.",
    });
  }
};

export const getCourseById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  try {
    const courseId = parseInt(req.params.id);
    if (!courseId) {
      res.status(400).json({
        error: "Bad request",
        message: "Course ID is required.",
      });
      return;
    }

    const course = await CourseService.getCourseById(courseId);
    if (!course) {
      res.status(404).json({
        error: "Not found",
        message: "Course not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
      message: "Course retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching course: ", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to fetch course.",
    });
  }
};

export const getRecentsCreatedCourses = async (
  _req: RequestWithIdParams,
  res: CustomResponse
) => {
  try {
    const courses = await CourseService.getRecentsCreatedCourses();
    if (!courses) {
      res.status(404).json({
        error: "No courses found",
        message: "No courses found in the Database",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: courses,
      message: "Courses retrieved successfully.",
    });
    return;
  } catch (error) {
    console.error("Error fetching courses: ", error);
    res.status(500).json({
      error: "Internal Server error.",
      message: "Failed to fetch courses.",
    });
  }
};
