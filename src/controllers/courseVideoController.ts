import {
  CourseVideoRequest,
  CustomResponse,
  RequestWithIdParams,
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
        message: "No course videos found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: videos,
      message: "Course videos retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch course videos",
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
    const { courseId, title, url, thumbnailUrl, price, description, duration } =
      req.body;

    if (!courseId || !title || !url || !thumbnailUrl || price === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "courseId, title, url, thumbnailUrl, and price are required",
      });
      return;
    }

    const newVideo = await CourseVideoService.createCourseVideo({
      courseId,
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
