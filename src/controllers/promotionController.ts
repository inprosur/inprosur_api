import { Promotion } from "../models/Promotion";
import {
  CustomResponse,
  PromotionRequest,
  RequestWithIdParams,
} from "../types/express";
import * as PromotionService from "../services/promotionService";

export const getAllPromotions = async (
  _req: PromotionRequest,
  res: CustomResponse
) => {
  try {
    const promotions = await PromotionService.getAllPromotions();
    if (!promotions || promotions.length === 0) {
      res.status(404).json({
        error: "No promotions found",
        message: "No promotions found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: promotions,
      message: "Promotions retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching promotions:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch promotions",
    });
  }
};

export const getPromotionById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const promotionId = parseInt(req.params.id);
  if (isNaN(promotionId)) {
    res.status(400).json({
      error: "Invalid promotion Id",
      message: "Promotion ID must be a number",
    });
  } else {
    try {
      const promotion = await PromotionService.getPromotionById(promotionId);
      if (promotion) {
        res.status(200).json({
          success: true,
          data: promotion,
          message: "Promotion retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Promotion not found",
          message: "Promotion not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching promotion:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch promotion",
      });
    }
  }
};

export const createPromotion = async (
  req: PromotionRequest,
  res: CustomResponse
) => {
  try {
    const { courseId, startDate, endDate, discountPercentage, status } =
      req.body;

    if (
      !courseId ||
      !startDate ||
      !endDate ||
      discountPercentage === undefined
    ) {
      res.status(400).json({
        error: "Missing required fields",
        message: "All fields are required except status (default: true)",
      });
      return;
    }

    const newPromotion = await PromotionService.createPromotion({
      courseId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      discountPercentage,
      status: status !== undefined ? status : true, // Default true
    });

    res.status(201).json({
      success: true,
      data: newPromotion,
      message: "Promotion created successfully.",
    });
  } catch (error) {
    console.error("Error creating promotion:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create promotion",
    });
  }
};

export const updatePromotion = async (
  req: RequestWithIdParams & { body: Partial<Omit<Promotion, "id">> },
  res: CustomResponse
) => {
  const promotionId = parseInt(req.params.id);
  if (isNaN(promotionId)) {
    res.status(400).json({
      error: "Invalid promotion ID",
      message: "Promotion ID must be a number",
    });
    return;
  }

  try {
    // Validar que al menos un campo sea proporcionado
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        error: "No fields provided",
        message: "At least one field must be provided for update",
      });
      return;
    }

    const updateSuccess = await PromotionService.updatePromotion(
      promotionId,
      req.body
    );

    if (!updateSuccess) {
      res.status(404).json({
        error: "Promotion not found",
        message: "The promotion could not be found or updated",
      });
      return;
    }

    // Devolver la promoción actualizada
    const updatedPromotion = await PromotionService.getPromotionById(promotionId);
    
    res.status(200).json({
      success: true,
      data: updatedPromotion,
      message: "Promotion updated successfully",
    });
  } catch (error) {
    console.error("Error updating promotion:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update promotion",
    });
  }
};

export const deletePromotion = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const promotionId = parseInt(req.params.id);
  if (isNaN(promotionId)) {
    res.status(400).json({
      error: "Invalid promotion ID",
      message: "Promotion ID must be a number",
    });
    return;
  }

  try {
    // Primero verificar si la promoción existe
    const promotion = await PromotionService.getPromotionById(promotionId);
    if (!promotion) {
      res.status(404).json({
        error: "Promotion not found",
        message: "The promotion could not be found",
      });
      return;
    }

    const deleteSuccess = await PromotionService.deletePromotion(promotionId);

    if (!deleteSuccess) {
      res.status(500).json({
        error: "Delete failed",
        message: "The promotion could not be deleted",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Promotion deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting promotion:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to delete promotion",
    });
  }
};