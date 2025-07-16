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
exports.getStudentCourses = exports.createEnrollment = exports.getEnrollmentById = exports.getAllEnrollments = void 0;
const EnrollmentService = __importStar(require("../services/enrollmentService"));
const getAllEnrollments = async (_req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch enrollments",
        });
    }
};
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = async (req, res) => {
    const enrollmentId = parseInt(req.params.id);
    if (isNaN(enrollmentId)) {
        res.status(400).json({
            error: "Invalid enrollment ID",
            message: "Enrollment ID must be a number",
        });
    }
    else {
        try {
            const enrollment = await EnrollmentService.getEnrollmentById(enrollmentId);
            if (enrollment) {
                res.status(200).json({
                    success: true,
                    data: enrollment,
                    message: "Enrollment retrieved successfully.",
                });
            }
            else {
                res.status(404).json({
                    error: "Enrollment not found",
                    message: "Enrollment not found.",
                });
            }
        }
        catch (error) {
            console.error("Error fetching enrollment:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch enrollment",
            });
        }
    }
};
exports.getEnrollmentById = getEnrollmentById;
const createEnrollment = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware.",
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
    }
    catch (error) {
        console.error("Error creating enrollment:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create enrollment",
        });
    }
};
exports.createEnrollment = createEnrollment;
const getStudentCourses = async (req, res) => {
    const enrollmentId = parseInt(req.params.id);
    if (isNaN(enrollmentId)) {
        res.status(400).json({
            error: "Invalid studentId",
            message: "Stundent ID  must be a number",
        });
    }
    else {
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
        }
        catch (error) {
            console.error("Error fetching courses: ", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch courses",
            });
        }
    }
};
exports.getStudentCourses = getStudentCourses;
