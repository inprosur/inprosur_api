import { Router } from "express";
import * as EnrollmentController from "../controllers/enrollmentController";

const router = Router();

router.get("/", EnrollmentController.getAllEnrollments);
router.get("/:id", EnrollmentController.getEnrollmentById);
router.get(
  "/studentEnrolledInCourse",
  EnrollmentController.studentEnrolledInCourse
);
router.post("/", EnrollmentController.createEnrollment);
router.get("/studentCourses", EnrollmentController.getStudentCourses);

export default router;
