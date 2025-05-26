import { Router } from "express";
import * as InstructorCommissionController from "../controllers/instructorCommissionController";

const router = Router();

router.get("/", InstructorCommissionController.getAllCommissions);
router.get("/:id", InstructorCommissionController.getCommissionById);
router.post("/", InstructorCommissionController.createCommission);

export default router;