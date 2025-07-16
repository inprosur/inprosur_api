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
exports.createCourseDocument = exports.getCourseDocumentById = exports.getAllCourseDocuments = void 0;
const CourseDocumentService = __importStar(require("../services/courseDocumentService"));
const getAllCourseDocuments = async (_req, res) => {
    try {
        const documents = await CourseDocumentService.getAllCourseDocuments();
        if (!documents || documents.length === 0) {
            res.status(404).json({
                error: "No documents found",
                message: "No course documents found in database."
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: documents,
            message: "Course documents retrieved successfully."
        });
    }
    catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch course documents"
        });
    }
};
exports.getAllCourseDocuments = getAllCourseDocuments;
const getCourseDocumentById = async (req, res) => {
    const docId = parseInt(req.params.id);
    if (isNaN(docId)) {
        res.status(400).json({
            error: "Invalid document ID",
            message: "Document ID must be a number"
        });
    }
    else {
        try {
            const document = await CourseDocumentService.getCourseDocumentById(docId);
            if (document) {
                res.status(200).json({
                    success: true,
                    data: document,
                    message: "Document retrieved successfully."
                });
            }
            else {
                res.status(404).json({
                    error: "Document not found",
                    message: "Course document not found."
                });
            }
        }
        catch (error) {
            console.error("Error fetching document:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch document"
            });
        }
    }
};
exports.getCourseDocumentById = getCourseDocumentById;
const createCourseDocument = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware."
            });
            return;
        }
        const { title, description, fileUrl, price, courseId } = req.body;
        if (!title || !fileUrl || price === undefined || !courseId) {
            res.status(400).json({
                error: "Missing required fields",
                message: "Title, fileUrl, price, and courseId are required"
            });
            return;
        }
        const newDocument = await CourseDocumentService.createCourseDocument({
            title,
            description: description || "",
            fileUrl,
            price,
            courseId
        });
        res.status(201).json({
            success: true,
            data: newDocument,
            message: "Course document created successfully."
        });
    }
    catch (error) {
        console.error("Error creating document:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create document"
        });
    }
};
exports.createCourseDocument = createCourseDocument;
