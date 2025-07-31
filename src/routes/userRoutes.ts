import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.post("/newUser", UserController.createUser);
router.post("/newInstructor", UserController.createInstructorUser);
router.get("/", UserController.getAllUsers);
router.get("/email/:email", UserController.getUserByEmail);
router.get("/email/full/:email", UserController.getFullUserByEmail);
router.get("/userStudent/:email", UserController.getUserStudentByEmail);

export default router;
