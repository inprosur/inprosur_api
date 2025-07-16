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
exports.createPaymentHistory = exports.getPaymentHistoryById = exports.getAllPaymentHistories = void 0;
const PaymentHistoryService = __importStar(require("../services/paymentHistoryService"));
const getAllPaymentHistories = async (_req, res) => {
    try {
        const payments = await PaymentHistoryService.getAllPaymentHistories();
        if (!payments || payments.length === 0) {
            res.status(404).json({
                error: "No payments found",
                message: "No payment history found in database."
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: payments,
            message: "Payment history retrieved successfully."
        });
    }
    catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch payment history"
        });
    }
};
exports.getAllPaymentHistories = getAllPaymentHistories;
const getPaymentHistoryById = async (req, res) => {
    const paymentId = parseInt(req.params.id);
    if (isNaN(paymentId)) {
        res.status(400).json({
            error: "Invalid payment ID",
            message: "Payment ID must be a number"
        });
    }
    else {
        try {
            const payment = await PaymentHistoryService.getPaymentHistoryById(paymentId);
            if (payment) {
                res.status(200).json({
                    success: true,
                    data: payment,
                    message: "Payment record retrieved successfully."
                });
            }
            else {
                res.status(404).json({
                    error: "Payment not found",
                    message: "Payment record not found."
                });
            }
        }
        catch (error) {
            console.error("Error fetching payment:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch payment record"
            });
        }
    }
};
exports.getPaymentHistoryById = getPaymentHistoryById;
const createPaymentHistory = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware."
            });
            return;
        }
        const { studentId, courseId, videoId, documentId, amount } = req.body;
        // Validación: Al menos un ID de recurso (course, video o document)
        if (!courseId && !videoId && !documentId) {
            res.status(400).json({
                error: "Missing resource reference",
                message: "At least one of courseId, videoId, or documentId is required"
            });
            return;
        }
        // Validación: studentId y amount son obligatorios
        if (!studentId || amount === undefined) {
            res.status(400).json({
                error: "Missing required fields",
                message: "studentId and amount are required"
            });
            return;
        }
        const newPayment = await PaymentHistoryService.createPaymentHistory({
            studentId,
            courseId,
            videoId,
            documentId,
            amount
        });
        res.status(201).json({
            success: true,
            data: newPayment,
            message: "Payment record created successfully."
        });
    }
    catch (error) {
        console.error("Error creating payment record:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create payment record"
        });
    }
};
exports.createPaymentHistory = createPaymentHistory;
