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
exports.getCategoryByDegreeId = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const CategoryService = __importStar(require("../services/categoryService"));
const getAllCategories = async (_req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        if (!categories || categories.length === 0) {
            res.status(404).json({
                error: "No categories found",
                message: "No categories found in database.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: categories,
            message: "Categories retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch categories",
        });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
        res.status(400).json({
            error: "Invalid category Id",
            message: "Category ID must be a number",
        });
    }
    else {
        try {
            const category = await CategoryService.getCategoryById(categoryId);
            if (category) {
                res.status(200).json({
                    success: true,
                    data: category,
                    message: "Category retrieved successfully.",
                });
            }
            else {
                res.status(404).json({
                    error: "Category not found",
                    message: "Category not found.",
                });
            }
        }
        catch (error) {
            console.error("Error fetching category:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch category",
            });
        }
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing.",
            });
            return;
        }
        const { name, degreeId } = req.body;
        if (!name || !degreeId) {
            res.status(400).json({
                error: "Missing required fields",
                message: "All fields are required",
            });
            return;
        }
        const newCategory = await CategoryService.createCategory({
            name,
            degreeId,
        });
        res.status(201).json({
            success: true,
            data: newCategory,
            message: "Category created successfully",
        });
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createCategory = createCategory;
const getCategoryByDegreeId = async (req, res) => {
    try {
        const degreeId = parseInt(req.query.degreeId);
        if (degreeId == null || isNaN(degreeId)) {
            res.status(400).json({
                error: "Missing required fields",
                message: "Degree ID is needed",
            });
            return;
        }
        const categories = await CategoryService.getCategoriesByDegreeId(degreeId);
        res.status(200).json({
            success: true,
            data: categories,
            message: "Categories By Degree ID retrieved successfully",
        });
    }
    catch (error) {
        console.error("Error fetching categories: ", error);
        res.status(500).json({
            error: "Interval Server Error",
            message: "Server Conection Missing",
        });
    }
};
exports.getCategoryByDegreeId = getCategoryByDegreeId;
