import { Router } from "express";
import * as CourseController from "../controllers/courseController";

const router = Router();

router.post("/newCourse", CourseController.createCourse);
router.get("/", CourseController.getAllCourses);
router.get("/recents", CourseController.getRecentsCreatedCourses);
router.get("/:id", CourseController.getCourseById);

export default router;
