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
exports.createAccessLog = exports.getAccessLogById = exports.getAllAccessLogs = void 0;
const AccessLogService = __importStar(require("../services/accessLogService"));
const getAllAccessLogs = async (_req, res) => {
    try {
        const accessLogs = await AccessLogService.getAllAccessLogs();
        if (!accessLogs || accessLogs.length === 0) {
            res.status(404).json({
                error: "No access logs found",
                message: "No access logs found in database.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: accessLogs,
            message: "Access logs retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching access logs:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch access logs",
        });
    }
};
exports.getAllAccessLogs = getAllAccessLogs;
const getAccessLogById = async (req, res) => {
    const accessLogId = parseInt(req.params.id);
    if (isNaN(accessLogId)) {
        res.status(400).json({
            error: "Invalid access log Id",
            message: "Access log ID must be a number"
        });
    }
    else {
        try {
            const accessLog = await AccessLogService.getAccessLogById(accessLogId);
            if (accessLog) {
                res.status(200).json({
                    success: true,
                    data: accessLog,
                    message: "Access log retrieved successfully.",
                });
            }
            else {
                res.status(404).json({
                    error: "Access log not found",
                    message: "Access log not found."
                });
            }
        }
        catch (error) {
            console.error("Error fetching access log:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch access log",
            });
        }
    }
};
exports.getAccessLogById = getAccessLogById;
const createAccessLog = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware.",
            });
            return;
        }
        const { accessType, studentId, courseId, videoId, documentId } = req.body;
        if (!accessType || !studentId) {
            res.status(400).json({
                error: "Missing required fields",
                message: "accessType and studentId are required fields",
            });
            return;
        }
        const newAccessLog = await AccessLogService.createAccessLog({
            accessType,
            studentId,
            courseId,
            videoId,
            documentId,
            accessTime: new Date()
        });
        res.status(201).json({
            success: true,
            data: newAccessLog,
            message: "Access log created successfully.",
        });
    }
    catch (error) {
        console.error("Error creating access log:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create access log"
        });
    }
};
exports.createAccessLog = createAccessLog;
