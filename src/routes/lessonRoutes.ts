import { Router } from "express";
import * as LessonController from "../controllers/lessonController";

const router = Router();

router.post("/newLesson", LessonController.createLesson);
router.get("/course/:id", LessonController.getLessons);
router.put("/editLesson/:id", LessonController.updateLesson);
router.delete("/deleteLesson/:id", LessonController.deleteLesson);

export default router;