"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseVideo = exports.getCourseVideoById = exports.getAllCourseVideos = void 0;
const CourseVideoService = __importStar(require("../services/courseVideoService"));
const getAllCourseVideos = async (_req, res) => {
    try {
        const videos = await CourseVideoService.getAllCourseVideos();
        if (!videos || videos.length === 0) {
            res.status(404).json({
                error: "No videos found",
                message: "No course videos found in database."
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: videos,
            message: "Course videos retrieved successfully."
        });
    }
    catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch course videos"
        });
    }
};
exports.getAllCourseVideos = getAllCourseVideos;
const getCourseVideoById = async (req, res) => {
    const videoId = parseInt(req.params.id);
    if (isNaN(videoId)) {
        res.status(400).json({
            error: "Invalid video ID",
            message: "Video ID must be a number"
        });
    }
    else {
        try {
            const video = await CourseVideoService.getCourseVideoById(videoId);
            if (video) {
                res.status(200).json({
                    success: true,
                    data: video,
                    message: "Video retrieved successfully."
                });
            }
            else {
                res.status(404).json({
                    error: "Video not found",
                    message: "Course video not found."
                });
            }
        }
        catch (error) {
            console.error("Error fetching video:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch video"
            });
        }
    }
};
exports.getCourseVideoById = getCourseVideoById;
const createCourseVideo = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware."
            });
            return;
        }
        const { courseId, title, url, thumbnailUrl, price, description, duration } = req.body;
        if (!courseId || !title || !url || !thumbnailUrl || price === undefined) {
            res.status(400).json({
                error: "Missing required fields",
                message: "courseId, title, url, thumbnailUrl, and price are required"
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
            price
        });
        res.status(201).json({
            success: true,
            data: newVideo,
            message: "Course video created successfully."
        });
    }
    catch (error) {
        console.error("Error creating video:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create video"
        });
    }
};
exports.createCourseVideo = createCourseVideo;
//# sourceMappingURL=courseVideoController.js.map