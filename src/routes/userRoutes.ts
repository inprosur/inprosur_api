import { Router } from "express";
import * as CourseController from "../controllers/courseController";

const router = Router();

router.post("/newUser", CourseController.createCourse);

export default router; 