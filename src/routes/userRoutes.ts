import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

// Define la ruta para hacer CRUD a todos los usuarios
// GET /api/users
router.get("/", UserController.getAllUsers);// POST /api/users/newUser
router.get("/email/:email", UserController.getUserByEmail);
router.post("/login", UserController.loginUser);
router.post("/", UserController.createUser);

//GET /api/users/:id
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.updateUser);


export default router;
