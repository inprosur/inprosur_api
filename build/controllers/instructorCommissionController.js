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
exports.createCommission = exports.getCommissionById = exports.getAllCommissions = void 0;
const InstructorCommissionService = __importStar(require("../services/instructorCommissionService"));
const getAllCommissions = async (_req, res) => {
    try {
        const commissions = await InstructorCommissionService.getAllCommissions();
        if (!commissions || commissions.length === 0) {
            res.status(404).json({
                error: "No commissions found",
                message: "No instructor commissions found in database."
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: commissions,
            message: "Commissions retrieved successfully."
        });
    }
    catch (error) {
        console.error("Error fetching commissions:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch commissions"
        });
    }
};
exports.getAllCommissions = getAllCommissions;
const getCommissionById = async (req, res) => {
    const commissionId = parseInt(req.params.id);
    if (isNaN(commissionId)) {
        res.status(400).json({
            error: "Invalid commission ID",
            message: "Commission ID must be a number"
        });
    }
    else {
        try {
            const commission = await InstructorCommissionService.getCommissionById(commissionId);
            if (commission) {
                res.status(200).json({
                    success: true,
                    data: commission,
                    message: "Commission retrieved successfully."
                });
            }
            else {
                res.status(404).json({
                    error: "Commission not found",
                    message: "Instructor commission not found."
                });
            }
        }
        catch (error) {
            console.error("Error fetching commission:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch commission"
            });
        }
    }
};
exports.getCommissionById = getCommissionById;
const createCommission = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware."
            });
            return;
        }
        const { instructorId, courseId, videoId, documentId, commissionPercentage, commissionAmount } = req.body;
        // Validación: Al menos un ID de recurso (course, video o document)
        if (!courseId && !videoId && !documentId) {
            res.status(400).json({
                error: "Missing resource reference",
                message: "At least one of courseId, videoId, or documentId is required"
            });
            return;
        }
        // Validación: instructorId es obligatorio
        if (!instructorId || commissionPercentage === undefined || commissionAmount === undefined) {
            res.status(400).json({
                error: "Missing required fields",
                message: "instructorId, commissionPercentage, and commissionAmount are required"
            });
            return;
        }
        const newCommission = await InstructorCommissionService.createCommission({
            instructorId,
            courseId,
            videoId,
            documentId,
            commissionPercentage,
            commissionAmount
        });
        res.status(201).json({
            success: true,
            data: newCommission,
            message: "Commission created successfully."
        });
    }
    catch (error) {
        console.error("Error creating commission:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create commission"
        });
    }
};
exports.createCommission = createCommission;
//# sourceMappingURL=instructorCommissionController.js.map