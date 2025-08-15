import { Router } from "express";
import * as EnrollmentController from "../controllers/enrollmentController";

const router = Router();

router.get("/", EnrollmentController.getAllEnrollments);
router.get(
  "/studentEnrolledInCourse",
  EnrollmentController.studentEnrolledInCourse
);
router.get("/:id", EnrollmentController.getEnrollmentById);
router.post("/", EnrollmentController.createEnrollment);
router.get("/studentCourses", EnrollmentController.getStudentCourses);

export default router;
