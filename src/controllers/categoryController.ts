import {
  CreateCategoryRequest,
  CustomResponse,
  InstructorByDegreeRequest,
  RequestWithIdParams,
} from "../types/express";
import * as CategoryService from "../services/categoryService";

export const getAllCategories = async (
  _req: CreateCategoryRequest,
  res: CustomResponse
) => {
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
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch categories",
    });
  }
};

export const getCategoryById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const categoryId = parseInt(req.params.id);
  if (isNaN(categoryId)) {
    res.status(400).json({
      error: "Invalid category Id",
      message: "Category ID must be a number",
    });
  } else {
    try {
      const category = await CategoryService.getCategoryById(categoryId);
      if (category) {
        res.status(200).json({
          success: true,
          data: category,
          message: "Category retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Category not found",
          message: "Category not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch category",
      });
    }
  }
};

export const createCategory = async (
  req: CreateCategoryRequest,
  res: CustomResponse
) => {
  try {
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
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCategoryByDegreeId = async (
  req: InstructorByDegreeRequest,
  res: CustomResponse
) => {
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
  } catch (error) {
    console.error("Error fetching categories: ", error);
    res.status(500).json({
      error: "Interval Server Error",
      message: "Server Conection Missing",
    });
  }
};
