import { Router } from "express";
import * as UserRoleController from "../controllers/userRoleController";

const router = Router();

router.post("/newUserRole", UserRoleController.createUserRole);

export default router;
