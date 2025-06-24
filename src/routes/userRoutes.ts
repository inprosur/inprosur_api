import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

// Define la ruta para hacer CRUD a todos los usuarios
// GET /api/users
router.get("/", UserController.getAllUsers);// POST /api/users/newUser
//obtener usuarios por email
router.get("/email/:email", UserController.getUserByEmail);
//logueo de usuarios
router.post("/login", UserController.loginUser);
//crear un nuevo usuario
router.post("/", UserController.createUser);

//GET /api/users/:id

router.get("/:id", UserController.getUserById);
//obtener usuarios por id
router.patch("/:id", UserController.updateUser);


export default router;
