import { Request, Response } from "express";
import * as AccessLogService from "../services/accessLogService";

export const getAllAccessLogs = async (_req: Request, res: Response) => {
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
    } catch (error) {
        console.error("Error fetching access logs:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch access logs",
        });
    }
};

export const getAccessLogById = async (req: Request, res: Response) => {
    const accessLogId = parseInt(req.params.id);
    if (isNaN(accessLogId)) {
        res.status(400).json({ 
            error: "Invalid access log Id", 
            message: "Access log ID must be a number" 
        });
    } else {
        try {
            const accessLog = await AccessLogService.getAccessLogById(accessLogId);
            if (accessLog) {
                res.status(200).json({
                    success: true,
                    data: accessLog,
                    message: "Access log retrieved successfully.",
                });
            } else {
                res.status(404).json({ 
                    error: "Access log not found", 
                    message: "Access log not found." 
                });
            }
        } catch (error) {
            console.error("Error fetching access log:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch access log",
            });
        }
    }
};

export const createAccessLog = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error("Error creating access log:", error);
        res.status(500).json({ 
            error: "Internal Server Error",
            message: "Failed to create access log" 
        });
    }
};