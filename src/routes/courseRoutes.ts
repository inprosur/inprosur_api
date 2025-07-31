import { Router } from "express";
import * as CourseController from "../controllers/courseController";

const router = Router();

router.post("/newCourse", CourseController.createCourse);
router.get("/", CourseController.getAllCourses);
router.get("/recents", CourseController.getRecentsCreatedCourses);
router.get("/:id", CourseController.getCourseById);
router.put("/editCourse/:id", CourseController.updateCourse);
router.delete("/deleteCourse/:id", CourseController.deleteCourse);
router.get("/instructor/:id", CourseController.getCoursesByInstructor);

export default router;
