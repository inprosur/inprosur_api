import {
  CourseDocumentRequest,
  CustomResponse,
  RequestWithIdParams,
} from "../types/express";
import * as CourseDocumentService from "../services/courseDocumentService";
import { CourseDocumentUpdate } from "../models/CourseDocument";

export const getAllCourseDocuments = async (
  _req: CourseDocumentRequest,
  res: CustomResponse
) => {
  try {
    const documents = await CourseDocumentService.getAllCourseDocuments();
    if (!documents || documents.length === 0) {
      res.status(404).json({
        error: "No documents found",
        message: "No lesson documents found in database.",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: documents,
      message: "Lesson documents retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch lesson documents",
    });
  }
};

export const getCourseDocumentById = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const docId = parseInt(req.params.id);
  if (isNaN(docId)) {
    res.status(400).json({
      error: "Invalid document ID",
      message: "Document ID must be a number",
    });
  } else {
    try {
      const document = await CourseDocumentService.getCourseDocumentById(docId);
      if (document) {
        res.status(200).json({
          success: true,
          data: document,
          message: "Document retrieved successfully.",
        });
      } else {
        res.status(404).json({
          error: "Document not found",
          message: "Course document not found.",
        });
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch document",
      });
    }
  }
};

export const createCourseDocument = async (
  req: CourseDocumentRequest,
  res: CustomResponse
) => {
  try {
    const { title, description, fileUrl, thumbnailUrl, price, lessonId } = req.body;

    if (!title || !fileUrl || price === undefined || !lessonId) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Title, fileUrl, price, and lessonId are required",
      });
      return;
    }

    const newDocument = await CourseDocumentService.createCourseDocument({
      title,
      description: description || "",
      fileUrl,
      thumbnailUrl,
      price,
      lessonId,
    });

    res.status(201).json({
      success: true,
      data: newDocument,
      message: "Course document created successfully.",
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to create document",
    });
  }
};

export const updateCourseDocument = async (
  req: RequestWithIdParams & { body: CourseDocumentUpdate },
  res: CustomResponse
) => {
  const docId = parseInt(req.params.id);
  if (isNaN(docId)) {
    res.status(400).json({
      error: "Invalid document ID",
      message: "Document ID must be a number",
    });
    return;
  }

  try {
    // Validar que al menos un campo sea proporcionado
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        error: "No fields provided",
        message: "At least one field must be provided for update",
      });
      return;
    }

    const updateSuccess = await CourseDocumentService.updateCourseDocument(
      docId,
      req.body
    );

    if (!updateSuccess) {
      res.status(404).json({
        error: "Document not found",
        message: "The document could not be found or updated",
      });
      return;
    }

    // Devolver el documento actualizado
    const updatedDoc = await CourseDocumentService.getCourseDocumentById(docId);
    
    res.status(200).json({
      success: true,
      data: updatedDoc,
      message: "Document updated successfully",
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to update document",
    });
  }
};

export const deleteCourseDocument = async (
  req: RequestWithIdParams,
  res: CustomResponse
) => {
  const docId = parseInt(req.params.id);
  if (isNaN(docId)) {
    res.status(400).json({
      error: "Invalid document ID",
      message: "Document ID must be a number",
    });
    return;
  }

  try {
    // Primero verificar si el documento existe
    const document = await CourseDocumentService.getCourseDocumentById(docId);
    if (!document) {
      res.status(404).json({
        error: "Document not found",
        message: "The document could not be found",
      });
      return;
    }

    const deleteSuccess = await CourseDocumentService.deleteCourseDocument(docId);

    if (!deleteSuccess) {
      res.status(500).json({
        error: "Delete failed",
        message: "The document could not be deleted",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to delete document",
    });
  }
};