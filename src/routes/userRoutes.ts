import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.post("/newUser", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/email/:email", UserController.getUserByEmail);
router.post("/registerInstructor", UserController.registerInstructor);


export default router;
