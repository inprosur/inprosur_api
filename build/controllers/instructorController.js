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
exports.getInstructorById = exports.getAllInstructors = exports.createInstructor = void 0;
const InstructorService = __importStar(require("../services/instructorService"));
const createInstructor = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Bad request",
                message: "Request body is required",
            });
            return;
        }
        const { name, biography, phone, userId } = req.body;
        if (!name || !biography || !phone || !userId) {
            res.status(400).json({
                error: "Bad request",
                message: "All fields are required",
            });
            return;
        }
        const instructor = {
            name,
            biography,
            phone,
            createdAt: new Date(),
            userId,
        };
        const newInstructor = await InstructorService.createInstructor(instructor);
        res.status(201).json({
            success: true,
            data: newInstructor,
            message: "Instructor created successfully",
        });
    }
    catch (error) {
        console.error("Error creating instructor: ", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to create instructor",
        });
    }
};
exports.createInstructor = createInstructor;
const getAllInstructors = async (_req, res) => {
    try {
        const instructors = await InstructorService.getAllInstructors();
        if (!instructors || instructors.length === 0) {
            res.status(404).json({
                error: "No instructors found",
                message: "No instructors found in the database.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: instructors,
            message: "Instructors retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error retrieving instructors:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to retrieve instructors.",
        });
    }
};
exports.getAllInstructors = getAllInstructors;
const getInstructorById = async (req, res) => {
    try {
        const instructorId = Number(req.params.id);
        if (!Number.isInteger(instructorId) || instructorId <= 0) {
            res.status(400).json({
                error: "Invalid instructor ID",
                message: "Instructor ID must be a positive integer.",
            });
            return;
        }
        const instructor = await InstructorService.getInstructorById(instructorId);
        if (!instructor) {
            res.status(404).json({
                error: "Instructor not found",
                message: `No instructor found with ID ${instructorId}.`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: instructor,
            message: "Instructor retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error retrieving instructor:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "failed to retrieve instructor.",
        });
    }
};
exports.getInstructorById = getInstructorById;
//# sourceMappingURL=instructorController.js.map