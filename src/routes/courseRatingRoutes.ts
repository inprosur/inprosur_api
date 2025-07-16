import { Router } from "express";
import * as CourseRatingController from "../controllers/courseRatingController";

const router = Router();

router.get("/", CourseRatingController.getAllCourseRatings);
router.get("/courseRanking", CourseRatingController.getRankingCourseRating);
router.post("/", CourseRatingController.createCourseRating);
router.get("/:id", CourseRatingController.getCourseRating);

export default router;
