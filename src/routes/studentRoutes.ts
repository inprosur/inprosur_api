import { Router } from "express";
import * as StudentController from "../controllers/studentController";

const router = Router();

router.post("/newStudent", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.get("/", StudentController.getStudentByUserId);

export default router;
