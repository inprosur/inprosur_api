import { Router } from "express";
import * as EnrollmentController from "../controllers/enrollmentController";

const router = Router();

router.get("/", EnrollmentController.getAllEnrollments);
router.get("/:id", EnrollmentController.getEnrollmentById);
router.post("/", EnrollmentController.createEnrollment);

export default router;