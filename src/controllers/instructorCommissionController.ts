import {
  CreateCommissionRequest,
  CustomResponse,
  RequestWithIdParams,
} from "../types/express";
import * as InstructorCommissionService from "../services/instructorCommissionService";

export const getAllCommissions = async (
  _req: CreateCommissionRequest,
  res: CustomResponse
) => {
  try {
    const commissions = await InstructorCommissionService.getAllCommissions();
    if (!commissions || commissions.length === 0) {
      res.status(404).json({
        error: "No commissions found",
        message: "No instructor commissions found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: commissions,
      message: "Commissions retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching commissions:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch commissions",
    });
  }
};

export const getCommissionById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const commissionId = parseInt(req.params.id);
  if (isNaN(commissionId)) {
    res.status(400).json({
      error: "Invalid commission ID",
      message: "Commission ID must be a number",
    });
  } else {
    try {
      const commission = await InstructorCommissionService.getCommissionById(
        commissionId
      );
      if (commission) {
        res.status(200).json({
          success: true,
          data: commission,
          message: "Commission retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Commission not found",
          message: "Instructor commission not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching commission:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch commission",
      });
    }
  }
};

export const createCommission = async (
  req: CreateCommissionRequest,
  res: CustomResponse
) => {
  try {
    const {
      instructorId,
      courseId,
      videoId,
      documentId,
      commissionPercentage,
      commissionAmount,
    } = req.body;

    // Validación: Al menos un ID de recurso (course, video o document)
    if (!courseId && !videoId && !documentId) {
      res.status(400).json({
        error: "Missing resource reference",
        message: "At least one of courseId, videoId, or documentId is required",
      });
      return;
    }

    // Validación: instructorId es obligatorio
    if (
      !instructorId ||
      commissionPercentage === undefined ||
      commissionAmount === undefined
    ) {
      res.status(400).json({
        error: "Missing required fields",
        message:
          "instructorId, commissionPercentage, and commissionAmount are required",
      });
      return;
    }

    const newCommission = await InstructorCommissionService.createCommission({
      instructorId,
      courseId,
      videoId,
      documentId,
      commissionPercentage,
      commissionAmount,
    });

    res.status(201).json({
      success: true,
      data: newCommission,
      message: "Commission created successfully.",
    });
  } catch (error) {
    console.error("Error creating commission:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create commission",
    });
  }
};
