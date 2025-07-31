import { Router } from "express";
import * as InstructorController from "../controllers/instructorController";

const router = Router();

router.post("/newInstructor", InstructorController.createInstructor);
router.get("/", InstructorController.getAllInstructors);
router.get("/:id", InstructorController.getInstructorById);
router.get("/public", InstructorController.getPublicInstructors);


export default router;
