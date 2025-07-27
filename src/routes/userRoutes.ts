import { Router } from "express";
import * as UserController from "../controllers/userController";



const router = Router();

router.post("/newUser", UserController.createUser);
router.post("/newInstructor", UserController.createInstructorUser);
router.get("/", UserController.getAllUsers);
router.get("/email/:email", UserController.getUserByEmail);

export default router;
