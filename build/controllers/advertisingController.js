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
exports.getAllAdvertisings = exports.createAdvertising = void 0;
const AdvertisingService = __importStar(require("../services/advertisingService"));
const createAdvertising = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing",
            });
            return;
        }
        const { imgUrl, externalUrl, courseId, status } = req.body;
        if (!imgUrl) {
            res.status(400).json({
                error: "Missing fields",
                message: "Missing requiered fields.",
            });
            return;
        }
        const newAdvertising = await AdvertisingService.createAdvertising({
            imgUrl,
            courseId: courseId ?? null,
            status,
            externalUrl: externalUrl ?? null,
            createdAt: new Date(),
        });
        res.status(200).json({
            success: true,
            data: newAdvertising,
            message: "Advetising created succesfully.",
        });
    }
    catch (error) {
        console.error("Error creating advertisingn item: ", error);
        res.status(500).json({
            error: "Internal Server error",
        });
    }
};
exports.createAdvertising = createAdvertising;
const getAllAdvertisings = async (_req, res) => {
    try {
        const advertisings = await AdvertisingService.getAllAdvertisings();
        if (!advertisings || advertisings.length === 0) {
            res.status(404).json({
                error: "No data found",
                message: "No se encontraron anuncions",
            });
            return;
        }
        const advertisingStatus = advertisings.map((advertising) => ({
            ...advertising,
            status: Boolean(advertising.status),
        }));
        res.status(200).json({
            success: true,
            data: advertisingStatus,
            message: "Users retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching advertisings: ", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch Advertisings.",
        });
    }
};
exports.getAllAdvertisings = getAllAdvertisings;
