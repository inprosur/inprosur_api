import { Router } from "express";
import * as CourseDocumentController from "../controllers/courseDocumentController";

const router = Router();

router.get("/", CourseDocumentController.getAllCourseDocuments);
router.get("/by-lesson", CourseDocumentController.getDocumentsByLesson);
router.get("/:id", CourseDocumentController.getCourseDocumentById);
router.post("/newDocument", CourseDocumentController.createCourseDocument);
router.put("/updateDocument/:id", CourseDocumentController.updateCourseDocument);
router.delete("/deleteDocument/:id", CourseDocumentController.deleteCourseDocument);

export default router;
