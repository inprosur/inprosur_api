import { Router } from "express";
import * as CategoryController from "../controllers/categoryController";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/degree", CategoryController.getCategoryByDegreeId);
router.get("/:id", CategoryController.getCategoryById);
router.post("/newCategory", CategoryController.createCategory);

export default router;
