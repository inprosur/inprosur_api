import {
  CreateCourseRatingRequest,
  CustomResponse,
  RequestWithIdParams,
} from "../types/express";
import * as CourseRatingService from "../services/courseRatingService";

export const getAllCourseRatings = async (
  _req: CreateCourseRatingRequest,
  res: CustomResponse
) => {
  try {
    const ratings = await CourseRatingService.getAllCourseRatings();
    if (!ratings || ratings.length === 0) {
      res.status(404).json({
        error: "No ratings found",
        message: "No course ratings found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: ratings,
      message: "Course ratings retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching course ratings:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch course ratings",
    });
  }
};

export const getCourseRating = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const courseId = parseInt(req.params.id);
  if (isNaN(courseId)) {
    res.status(400).json({
      error: "Invalid rating ID",
      message: "Rating ID must be a number",
    });
  } else {
    try {
      const rating = await CourseRatingService.getCourseRating(courseId);
      if (rating) {
        res.status(200).json({
          success: true,
          data: rating,
          message: "Course rating retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Rating not found",
          message: "Course rating not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching rating:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch course rating",
      });
    }
  }
};

export const createCourseRating = async (
  req: CreateCourseRatingRequest,
  res: CustomResponse
) => {
  try {
    const { studentId, courseId, rating } = req.body;

    // Validación de campos requeridos
    if (!studentId || !courseId || rating === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "studentId, courseId, and rating are required",
      });
      return;
    }

    // Validación de que el rating esté entre 1 y 5
    if (rating < 1 || rating > 5) {
      res.status(400).json({
        error: "Invalid rating value",
        message: "Rating must be between 1 and 5",
      });
      return;
    }

    const newRating = await CourseRatingService.createCourseRating({
      studentId,
      courseId,
      rating,
    });

    res.status(201).json({
      success: true,
      data: newRating,
      message: "Course rating created successfully.",
    });
  } catch (error) {
    console.error("Error creating course rating:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create course rating",
    });
  }
};

export const getCourseRatingByStudent = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const studentId = parseInt(req.params.id);
  if (isNaN(studentId)) {
    res.status(400).json({
      error: "Invalid rating ID",
      message: "Rating ID must be a number",
    });
  } else {
    try {
      const rating = await CourseRatingService.getCourseRatingByStudent(
        studentId
      );
      if (rating) {
        res.status(200).json({
          success: true,
          data: rating,
          message: "Course rating from student retrieve successfully.",
        });
        return;
      } else {
        res.status(404).json({
          error: "Rating not found",
          message: "Rating from student not found",
        });
        return;
      }
    } catch (error) {
      console.error("Error fetching data from db");
      res.status(500).json({
        error: "Interval server error.",
        message: "Failed fetching rating",
      });
    }
  }
};

export const getRankingCourseRating = async (
  _req: CreateCourseRatingRequest,
  res: CustomResponse
) => {
  try {
    const result = await CourseRatingService.getRankingCourseRating();
    res.status(200).json({
      success: true,
      data: result,
      message: "Course ratings ranking retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching course ratings rankings:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch course ratings rankings",
    });
  }
};
