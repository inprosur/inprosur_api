import * as CommissionService from "../services/commissionService";
import { CommissionRequest, CustomResponse } from "../types/express";

export const createCommission = async (
  req: CommissionRequest,
  res: CustomResponse
) => {
  try {
    const { instructorId, percentage } = req.body;

    if (!instructorId || !percentage) {
      res.status(400).json({
        error: "Fields Missing",
        message: "instructorId and percentage are required.",
      });
      return;
    }

    const newCommission = await CommissionService.createCommission({
      instructorId,
      percentage,
    });

    res.status(201).json({
      success: true,
      data: newCommission,
      message: "Commission created successfully.",
    });
  } catch (error) {
    console.error("Error creating commission:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create commission.",
    });
  }
};
