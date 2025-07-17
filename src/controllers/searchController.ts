import * as SearchService from "../services/searchServices";
import { SearchRequest, CustomResponse } from "../types/express";

export const searchCourses = async (
  req: SearchRequest,
  res: CustomResponse
) => {
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

export const searchCoursesByCategory = async (
  req: SearchRequest,
  res: CustomResponse
) => {
  const categoryId = req.params.categoryId;
  const term = req.query.term as string;
  if (!categoryId) {
    res.status(400).json({
      error: "Bad request",
      message: "Invalid category ID.",
    });
  }
  try {
    let text = term === "" ? "" : "%" + term + "%";
    const results = await SearchService.searchCoursesByCategory(
      Number(categoryId),
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
