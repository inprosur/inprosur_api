import { Router } from "express";
import * as RoleController from "../controllers/roleController";

const router = Router();

// Define la ruta para hacer CRUD a la tabla roles
// Post /api/roles/newRole
router.post("/newRole", RoleController.createRole);
router.get("/", RoleController.getAllRoles);
router.get("/:id", RoleController.getRoleById);

export default router;
