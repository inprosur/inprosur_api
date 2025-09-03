import { Request, Response } from "express";
import * as CombinedContentService from "../services/combinedContentService";

interface ReorderRequest {
  updates: Array<{
    id: number;
    type: 'video' | 'document';
    display_order: number;
  }>;
}

export const getCombinedContent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const lessonId = parseInt(req.params.lessonId);
    
    if (isNaN(lessonId)) {
      return res.status(400).json({
        error: "Invalid lesson ID",
        message: "Lesson ID must be a number"
      });
    }

    const content = await CombinedContentService.getCombinedContentByLesson(lessonId);
    
    return res.status(200).json({
      success: true,
      data: content,
      message: "Combined content retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching combined content:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch combined content"
    });
  }
};

export const reorderContent = async (req: Request<{}, {}, ReorderRequest>, res: Response): Promise<void> => {
  try {
    const { updates } = req.body;

    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      res.status(400).json({
        error: "Invalid request",
        message: "Updates array is required"
      });
      return; // Agregar return aquí
    }

    await CombinedContentService.updateContentOrder(updates);
    
    res.status(200).json({
      success: true,
      message: "Content order updated successfully"
    });
  } catch (error) {
    console.error("Error reordering content:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to reorder content"
    });
  }
};