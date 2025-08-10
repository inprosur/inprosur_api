import { Router } from "express";
import * as CourseVideoController from "../controllers/courseVideoController";

const router = Router();

router.get("/", CourseVideoController.getAllCourseVideos);
router.get("/:id", CourseVideoController.getCourseVideoById);
router.post("/newVideo", CourseVideoController.createCourseVideo);

export default router;
