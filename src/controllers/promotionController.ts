import { Request, Response } from "express";
import * as PromotionService from "../services/promotionService";

export const getAllPromotions = async (_req: Request, res: Response) => {
    try {
        const promotions = await PromotionService.getAllPromotions();
        if (!promotions || promotions.length === 0) {
            res.status(404).json({
                error: "No promotions found",
                message: "No promotions found in database."
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: promotions,
            message: "Promotions retrieved successfully."
        });
    } catch (error) {
        console.error("Error fetching promotions:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch promotions"
        });
    }
};

export const getPromotionById = async (req: Request, res: Response) => {
    const promotionId = parseInt(req.params.id);
    if (isNaN(promotionId)) {
        res.status(400).json({
            error: "Invalid promotion Id",
            message: "Promotion ID must be a number"
        });
    } else {
        try {
            const promotion = await PromotionService.getPromotionById(promotionId);
            if (promotion) {
                res.status(200).json({
                    success: true,
                    data: promotion,
                    message: "Promotion retrieved successfully."
                });
            } else {
                res.status(404).json({
                    error: "Promotion not found",
                    message: "Promotion not found."
                });
            }
        } catch (error) {
            console.error("Error fetching promotion:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch promotion"
            });
        }
    }
};

export const createPromotion = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware."
            });
            return;
        }

        const { courseId, startDate, endDate, discountPercentage, status } = req.body;

        if (!courseId || !startDate || !endDate || discountPercentage === undefined) {
            res.status(400).json({
                error: "Missing required fields",
                message: "All fields are required except status (default: true)"
            });
            return;
        }

        const newPromotion = await PromotionService.createPromotion({
            courseId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            discountPercentage,
            status: status !== undefined ? status : true // Default true
        });

        res.status(201).json({
            success: true,
            data: newPromotion,
            message: "Promotion created successfully."
        });
    } catch (error) {
        console.error("Error creating promotion:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create promotion"
        });
    }
};