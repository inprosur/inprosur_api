import { Router } from "express";
import * as CourseRatingController from "../controllers/courseRatingController";

const router = Router();

router.get("/", CourseRatingController.getAllCourseRatings);
router.get("/:id", CourseRatingController.getCourseRatingById);
router.post("/", CourseRatingController.createCourseRating);

export default router;