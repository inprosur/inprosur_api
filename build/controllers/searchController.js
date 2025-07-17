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
exports.searchCoursesByCategory = exports.searchCourses = void 0;
const SearchService = __importStar(require("../services/searchServices"));
const searchCourses = async (req, res) => {
    const term = req.query.term;
    if (!term) {
        res.status(400).json({
            error: "Bad request",
            message: "Search term is required.",
        });
    }
    try {
        let text = "%" + term + "%";
        const results = await SearchService.searchCourses(text);
        res.status(200).json({
            success: true,
            data: results,
            message: "Search results retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error searching courses:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to search courses.",
        });
    }
};
exports.searchCourses = searchCourses;
const searchCoursesByCategory = async (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    const term = req.query.term;
    if (isNaN(categoryId)) {
        res.status(400).json({
            error: "Bad request",
            message: "Invalid category ID.",
        });
    }
    try {
        let text = term === "" ? "" : "%" + term + "%";
        const results = await SearchService.searchCoursesByCategory(categoryId, text);
        res.status(200).json({
            success: true,
            data: results,
            message: "Search results by category retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error searching courses by category:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to search courses by category.",
        });
    }
};
exports.searchCoursesByCategory = searchCoursesByCategory;
//# sourceMappingURL=searchController.js.map