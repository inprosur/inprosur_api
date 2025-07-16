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
exports.getRankingCourseRating = exports.getCourseRatingByStudent = exports.createCourseRating = exports.getCourseRating = exports.getAllCourseRatings = void 0;
const CourseRatingService = __importStar(require("../services/courseRatingService"));
const getAllCourseRatings = async (_req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching course ratings:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch course ratings",
        });
    }
};
exports.getAllCourseRatings = getAllCourseRatings;
const getCourseRating = async (req, res) => {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
        res.status(400).json({
            error: "Invalid rating ID",
            message: "Rating ID must be a number",
        });
    }
    else {
        try {
            const rating = await CourseRatingService.getCourseRating(courseId);
            if (rating) {
                res.status(200).json({
                    success: true,
                    data: rating,
                    message: "Course rating retrieved successfully.",
                });
            }
            else {
                res.status(404).json({
                    error: "Rating not found",
                    message: "Course rating not found.",
                });
            }
        }
        catch (error) {
            console.error("Error fetching rating:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch course rating",
            });
        }
    }
};
exports.getCourseRating = getCourseRating;
const createCourseRating = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware.",
            });
            return;
        }
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
    }
    catch (error) {
        console.error("Error creating course rating:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create course rating",
        });
    }
};
exports.createCourseRating = createCourseRating;
const getCourseRatingByStudent = async (req, res) => {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        res.status(400).json({
            error: "Invalid rating ID",
            message: "Rating ID must be a number",
        });
    }
    else {
        try {
            const rating = await CourseRatingService.getCourseRatingByStudent(studentId);
            if (rating) {
                res.status(200).json({
                    success: true,
                    data: rating,
                    message: "Course rating from student retrieve successfully.",
                });
                return;
            }
            else {
                res.status(404).json({
                    error: "Rating not found",
                    message: "Rating from student not found",
                });
                return;
            }
        }
        catch (error) {
            console.error("Error fetching data from db");
            res.status(500).json({
                error: "Interval server error.",
                message: "Failed fetching rating",
            });
        }
    }
};
exports.getCourseRatingByStudent = getCourseRatingByStudent;
const getRankingCourseRating = async (_req, res) => {
    try {
        const result = await CourseRatingService.getRankingCourseRating();
        res.status(200).json({
            success: true,
            data: result,
            message: "Course ratings ranking retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching course ratings rankings:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch course ratings rankings",
        });
    }
};
exports.getRankingCourseRating = getRankingCourseRating;
