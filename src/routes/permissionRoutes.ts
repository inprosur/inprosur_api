import { Router } from "express";
import * as PermissionController from "../controllers/permissionController";

const router = Router();

// Define las rutas para hacer CRUD a todos los permisos
// GET /api/permissions
router.get("/", PermissionController.getAllPermissions);
// GET /api/permissions/:id
router.get("/:id", PermissionController.getPermissionById);
// POST /api/permissions/newPermission
router.post("/newPermission", PermissionController.createPermission);

export default router;
