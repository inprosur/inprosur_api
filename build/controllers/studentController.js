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
exports.getStudentByUserId = exports.getStudentById = exports.getAllStudents = exports.createStudent = void 0;
const StudentService = __importStar(require("../services/studentService"));
const createStudent = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Bad request",
                message: "Request body is required",
            });
            return;
        }
        const { name, phone, address, fingerprint, userId } = req.body;
        if (!name || !address || !phone || !userId) {
            res.status(400).json({
                error: "Bad request",
                message: "All fields are required",
            });
            return;
        }
        const student = {
            name,
            phone,
            address,
            fingerprint: fingerprint || null,
            createdAt: new Date(),
            userId,
        };
        const newStudent = await StudentService.createStudent(student);
        res.status(201).json({
            success: true,
            data: newStudent,
            message: "Student created successfully",
        });
    }
    catch (error) {
        console.error("Error creating student: ", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to create student",
        });
    }
};
exports.createStudent = createStudent;
const getAllStudents = async (_req, res) => {
    try {
        const students = await StudentService.getAllStudents();
        if (!students || students.length === 0) {
            res.status(404).json({
                error: "No students found",
                message: "No students found in the database.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: students,
            message: "Students retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to fetch students",
        });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        if (!studentId) {
            res.status(400).json({
                error: "Bad request",
                message: "Student ID is required.",
            });
            return;
        }
        const student = StudentService.getStudentById(studentId);
        if (!student) {
            res.status(404).json({
                error: "Not found",
                message: "Student not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: student,
            message: "Student retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to fetch student",
        });
    }
};
exports.getStudentById = getStudentById;
const getStudentByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.query.userId);
        if (!userId || isNaN(userId)) {
            res.status(400).json({
                error: "Bad request",
                message: "User ID is required.",
            });
            return;
        }
        const student = await StudentService.getStudentByUserId(userId);
        if (!student) {
            res.status(200).json({
                success: true,
                data: null,
                message: "Student not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: student,
            message: "Student retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching student by userId: ", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch student by userId.",
        });
    }
};
exports.getStudentByUserId = getStudentByUserId;
