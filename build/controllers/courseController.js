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
exports.getRecentsCreatedCourses = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const CourseService = __importStar(require("../services/courseService"));
const createCourse = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middlewre.",
            });
            return;
        }
        const { title, description, instructorId, categoryId, price, isPublished, duration, thumbnailUrl, } = req.body;
        if (!title || !description || !instructorId || !price || !isPublished) {
            res.status(400).json({
                error: "Missing required fields",
                message: "title, description, instructorId, price, isPublished are required",
            });
            return;
        }
        const newCourse = await CourseService.createCourse({
            title,
            description,
            instructorId,
            categoryId: categoryId || null,
            price,
            isPublished,
            duration: duration || null,
            thumbnailUrl: thumbnailUrl || null,
            creationDate: new Date(),
        });
        res.status(201).json({
            success: true,
            data: newCourse,
            message: "Course created successfully.",
        });
    }
    catch (error) {
        console.log("Error creating user: ", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create the Course.",
        });
    }
};
exports.createCourse = createCourse;
const getAllCourses = async (_req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching courses: ", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to fetch courses.",
        });
    }
};
exports.getAllCourses = getAllCourses;
const getCourseById = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching course: ", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to fetch course.",
        });
    }
};
exports.getCourseById = getCourseById;
const getRecentsCreatedCourses = async (_req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching courses: ", error);
        res.status(500).json({
            error: "Internal Server error.",
            message: "Failed to fetch courses.",
        });
    }
};
exports.getRecentsCreatedCourses = getRecentsCreatedCourses;
//# sourceMappingURL=courseController.js.map