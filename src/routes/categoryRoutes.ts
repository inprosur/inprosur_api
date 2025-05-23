import { Router } from "express";
import * as CategoryController from "../controllers/categoryController";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", CategoryController.createCategory);

export default router;