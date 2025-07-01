import { Router } from "express";
import * as CourseRatingController from "../controllers/courseRatingController";

const router = Router();

router.get("/", CourseRatingController.getAllCourseRatings);
router.get("/rating/:id", CourseRatingController.getCourseRating);
router.post("/", CourseRatingController.createCourseRating);
router.get("/courseRanking", CourseRatingController.getRankingCourseRating);

export default router;
