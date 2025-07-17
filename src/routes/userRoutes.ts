import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

//crear un nuevo usuario
router.post("/new", UserController.createUser);
// GET /api/users
router.get("/", UserController.getAllUsers); // POST /api/users/newUser
//obtener usuarios por email
router.get("/email/:email", UserController.getUserByEmail);
//logueo de usuarios
router.post("/login", UserController.loginUser);

//GET /api/users/:id

router.get("/:id", UserController.getUserById);
//obtener usuarios por id
router.patch("/:id", UserController.updateUser);

//eliminar usuario por id
router.delete("/:id", UserController.deleteUser);

export default router;
