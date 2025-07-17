import { Request, Response } from "express";
import * as SearchService from "../services/searchServices";

export const searchCourses = async (req: Request, res: Response) => {
  const term = req.query.term as string;
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
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to search courses.",
    });
  }
};

interface SearchParams {
  //term: string;
  categoryId: string;
}

export const searchCoursesByCategory = async (req: Request<SearchParams>, res: Response) => {
  const categoryId = parseInt(req.params.categoryId);
  const term = req.query.term as string;
  if (isNaN(categoryId)) {
    res.status(400).json({
      error: "Bad request",
      message: "Invalid category ID.",
    });
  }
  try {
    let text = term === "" ? "" : "%" + term + "%";
    const results = await SearchService.searchCoursesByCategory(
      categoryId,
      text
    );
    res.status(200).json({
      success: true,
      data: results,
      message: "Search results by category retrieved successfully.",
    });
  } catch (error) {
    console.error("Error searching courses by category:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to search courses by category.",
    });
  }
};
