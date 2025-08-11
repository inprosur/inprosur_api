import {
  CreateLessonRequest,
  CustomResponse,
  RequestWithIdParams,
  UpdateLessonRequest,
} from "../types/express";
import * as LessonService from "../services/lessonsServices";

export const createLesson = async (
  req: CreateLessonRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const { courseId, title, description, price, state } = req.body;

    if (!courseId || !title || price === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "courseId, title and price are required",
      });
      return;
    }

    const newLesson = await LessonService.createLesson({
      courseId,
      title,
      description,
      price,
      state: state ?? true,
    });

    res.status(201).json({
      success: true,
      data: newLesson,
      message: "Lesson created successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create lesson",
    });
  }
};

export const getLessonsByCourse = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  try {
    const courseId = parseInt(req.params.id);
    const lessons = await LessonService.getLessonsByCourse(courseId);

    res.status(200).json({
      success: true,
      data: lessons,
      message: "Lessons retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch lessons",
    });
  }
};

export const updateLesson = async (
  req: UpdateLessonRequest,
  res: CustomResponse
): Promise<void> => {
  try {
    const lessonId = parseInt(req.params.id);
    const updatedLesson = await LessonService.updateLesson(lessonId, req.body);

    if (!updatedLesson) {
      res.status(404).json({
        error: "Not Found",
        message: "Lesson not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedLesson,
      message: "Lesson updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update lesson",
    });
  }
};

export const deleteLesson = async (
  req: RequestWithIdParams,
  res: CustomResponse
): Promise<void> => {
  try {
    const lessonId = parseInt(req.params.id);
    const success = await LessonService.deleteLesson(lessonId);

    if (!success) {
      res.status(404).json({
        error: "Not Found",
        message: "Lesson not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to delete lesson",
    });
  }
};
