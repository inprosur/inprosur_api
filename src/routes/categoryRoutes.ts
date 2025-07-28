import { Router } from "express";
import * as CategoryController from "../controllers/categoryController";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/degree", CategoryController.getCategoryByDegreeId);
router.get("/:id", CategoryController.getCategoryById);
router.post("/newCategory", CategoryController.createCategory);
router.put("/editCategory/:id", CategoryController.updateCategory);
router.delete("/deleteCategory/:id", CategoryController.deleteCategory);

export default router;
