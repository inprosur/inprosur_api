import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

// Define la ruta para hacer CRUD a todos los usuarios
// GET /api/users
router.get("/", UserController.getAllUsers);
//GET /api/users/:id
router.get("/:id", UserController.getUserById);
// POST /api/users/newUser
router.post("/", UserController.createUser);
router.get("/email/:email", UserController.getUserByEmail);
router.patch("/:id", UserController.updateUser);

export default router;
