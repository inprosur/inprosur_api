import {
  CourseVideoRequest,
  CustomResponse,
  RequestWithIdParams,
  RequestWithLessonId,
  CourseVideoUpdate,
} from "../types/express";
import * as CourseVideoService from "../services/courseVideoService";

export const getAllCourseVideos = async (
  _req: CourseVideoRequest,
  res: CustomResponse
) => {
  try {
    const videos = await CourseVideoService.getAllCourseVideos();
    if (!videos || videos.length === 0) {
      res.status(404).json({
        error: "No videos found",
        message: "No lesson videos found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: videos,
      message: "Lessons videos retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch lessons videos",
    });
  }
};

export const getVideosByLesson = async (
  req: RequestWithLessonId,
  res: CustomResponse
) => {
  const lessonId = parseInt(req.query.lessonId);
  if (isNaN(lessonId)) {
    res.status(400).json({
      error: "Invalid lesson ID",
      message: "Lesson ID must be a number",
    });
    return;
  }

  try {
    const videos = await CourseVideoService.getVideosByLesson(lessonId);
    res.status(200).json({
      success: true,
      data: videos,
      message: "Videos retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching videos by lesson:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch videos by lesson",
    });
  }
};

export const getCourseVideoById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.status(400).json({
      error: "Invalid video ID",
      message: "Video ID must be a number",
    });
  } else {
    try {
      const video = await CourseVideoService.getCourseVideoById(videoId);
      if (video) {
        res.status(200).json({
          success: true,
          data: video,
          message: "Video retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Video not found",
          message: "Course video not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch video",
      });
    }
  }
};

export const createCourseVideo = async (
  req: CourseVideoRequest,
  res: CustomResponse
) => {
  try {
    const { lessonId, title, url, thumbnailUrl, price, description, duration } =
      req.body;

    if (!lessonId || !title || !url || !thumbnailUrl || price === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "lessonId, title, url, thumbnailUrl, and price are required",
      });
      return;
    }

    const newVideo = await CourseVideoService.createCourseVideo({
      lessonId,
      title,
      description: description || "",
      url,
      thumbnailUrl,
      duration: duration || "00:00:00", // Valor por defecto si no se proporciona
      price,
    });

    res.status(201).json({
      success: true,
      data: newVideo,
      message: "Course video created successfully.",
    });
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create video",
    });
  }
};

export const updateCourseVideo = async (
  req: RequestWithIdParams & { body: CourseVideoUpdate },
  res: CustomResponse
) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.status(400).json({
      error: "Invalid video ID",
      message: "Video ID must be a number",
    });
    return;
  }

  try {
    // Validar que al menos un campo sea proporcionado
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        error: "No fields provided",
        message: "At least one field must be provided for update",
      });
      return;
    }

    const updateSuccess = await CourseVideoService.updateCourseVideo(
      videoId,
      req.body
    );

    if (!updateSuccess) {
      res.status(404).json({
        error: "Video not found",
        message: "The video could not be found or updated",
      });
      return;
    }

    // Opcional: Devolver el video actualizado
    const updatedVideo = await CourseVideoService.getCourseVideoById(videoId);
    
    res.status(200).json({
      success: true,
      data: updatedVideo,
      message: "Video updated successfully",
    });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update video",
    });
  }
};

export const deleteCourseVideo = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const videoId = parseInt(req.params.id);
  if (isNaN(videoId)) {
    res.status(400).json({
      error: "Invalid video ID",
      message: "Video ID must be a number",
    });
    return;
  }

  try {
    // Primero verificar si el video existe
    const video = await CourseVideoService.getCourseVideoById(videoId);
    if (!video) {
      res.status(404).json({
        error: "Video not found",
        message: "The video could not be found",
      });
      return;
    }

    const deleteSuccess = await CourseVideoService.deleteCourseVideo(videoId);

    if (!deleteSuccess) {
      res.status(500).json({
        error: "Delete failed",
        message: "The video could not be deleted",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to delete video",
    });
  }
};