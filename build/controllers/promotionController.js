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
exports.createPromotion = exports.getPromotionById = exports.getAllPromotions = void 0;
const PromotionService = __importStar(require("../services/promotionService"));
const getAllPromotions = async (_req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching promotions:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch promotions"
        });
    }
};
exports.getAllPromotions = getAllPromotions;
const getPromotionById = async (req, res) => {
    const promotionId = parseInt(req.params.id);
    if (isNaN(promotionId)) {
        res.status(400).json({
            error: "Invalid promotion Id",
            message: "Promotion ID must be a number"
        });
    }
    else {
        try {
            const promotion = await PromotionService.getPromotionById(promotionId);
            if (promotion) {
                res.status(200).json({
                    success: true,
                    data: promotion,
                    message: "Promotion retrieved successfully."
                });
            }
            else {
                res.status(404).json({
                    error: "Promotion not found",
                    message: "Promotion not found."
                });
            }
        }
        catch (error) {
            console.error("Error fetching promotion:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch promotion"
            });
        }
    }
};
exports.getPromotionById = getPromotionById;
const createPromotion = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error creating promotion:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create promotion"
        });
    }
};
exports.createPromotion = createPromotion;
//# sourceMappingURL=promotionController.js.map