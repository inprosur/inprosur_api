import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

// Solo la ruta de creación de usuarios
router.post("/newUser", UserController.createUser);
router.get("/", UserController.getAllUsers);
export default router;