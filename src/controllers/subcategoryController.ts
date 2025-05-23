import { Request, Response } from "express";
import * as SubcategoryService from "../services/subcategoryService";

export const getAllSubcategories = async (_req: Request, res: Response) => {
  try {
    const subcategories = await SubcategoryService.getAllSubcategories();
    if (!subcategories || subcategories.length === 0) {
      res.status(404).json({
        error: "No subcategories found",
        message: "No subcategories found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: subcategories,
      message: "Subcategories retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch subcategories",
    });
  }
};

export const getSubcategoryById = async (req: Request, res: Response) => {
  const subcategoryId = parseInt(req.params.id);
  if (isNaN(subcategoryId)) {
    res.status(400).json({ 
      error: "Invalid subcategory Id", 
      message: "Subcategory ID must be a number" 
    });
  } else {
    try {
      const subcategory = await SubcategoryService.getSubcategoryById(subcategoryId);
      if (subcategory) {
        res.status(200).json({
          success: true,
          data: subcategory,
          message: "Subcategory retrieved successfully.",
        });
      } else {
        res.status(404).json({ 
          error: "Subcategory not found", 
          message: "Subcategory not found." 
        });
      }
    } catch (error) {
      console.error("Error fetching subcategory:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch subcategory",
      });
    }
  }
};

export const createSubcategory = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        error: "Body is missing",
        message: "Request body is missing.",
      });
      return;
    }

    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      res.status(400).json({
        error: "Missing required fields",
        message: "All fields are required",
      });
      return;
    }
    const newSubcategory = await SubcategoryService.createSubcategory({
      name,
      categoryId,
    });
    res.status(201).json({
      success: true,
      data: newSubcategory,
      message: "Subcategory created successfully",
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};