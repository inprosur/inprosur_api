import {
  CreatePaymentHistoryRequest,
  CustomResponse,
  RequestWithIdParams,
} from "../types/express";
import * as PaymentHistoryService from "../services/paymentHistoryService";

export const getAllPaymentHistories = async (
  _req: CreatePaymentHistoryRequest,
  res: CustomResponse
) => {
  try {
    const payments = await PaymentHistoryService.getAllPaymentHistories();
    if (!payments || payments.length === 0) {
      res.status(404).json({
        error: "No payments found",
        message: "No payment history found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: payments,
      message: "Payment history retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch payment history",
    });
  }
};

export const getPaymentHistoryById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const paymentId = parseInt(req.params.id);
  if (isNaN(paymentId)) {
    res.status(400).json({
      error: "Invalid payment ID",
      message: "Payment ID must be a number",
    });
  } else {
    try {
      const payment = await PaymentHistoryService.getPaymentHistoryById(
        paymentId
      );
      if (payment) {
        res.status(200).json({
          success: true,
          data: payment,
          message: "Payment record retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Payment not found",
          message: "Payment record not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching payment:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch payment record",
      });
    }
  }
};

export const createPaymentHistory = async (
  req: CreatePaymentHistoryRequest,
  res: CustomResponse
) => {
  try {
    const { studentId, courseId, videoId, documentId, amount } = req.body;

    // Validación: Al menos un ID de recurso (course, video o document)
    if (!courseId && !videoId && !documentId) {
      res.status(400).json({
        error: "Missing resource reference",
        message: "At least one of courseId, videoId, or documentId is required",
      });
      return;
    }

    // Validación: studentId y amount son obligatorios
    if (!studentId || amount === undefined) {
      res.status(400).json({
        error: "Missing required fields",
        message: "studentId and amount are required",
      });
      return;
    }

    const newPayment = await PaymentHistoryService.createPaymentHistory({
      studentId,
      courseId,
      videoId,
      documentId,
      amount,
    });

    res.status(201).json({
      success: true,
      data: newPayment,
      message: "Payment record created successfully.",
    });
  } catch (error) {
    console.error("Error creating payment record:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create payment record",
    });
  }
};
