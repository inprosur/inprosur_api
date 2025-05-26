import { Router } from "express";
import * as CourseDocumentController from "../controllers/courseDocumentController";

const router = Router();

router.get("/", CourseDocumentController.getAllCourseDocuments);
router.get("/:id", CourseDocumentController.getCourseDocumentById);
router.post("/", CourseDocumentController.createCourseDocument);

export default router;