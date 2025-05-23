import { Router } from "express";
import * as SubcategoryController from "../controllers/subcategoryController";

const router = Router();

router.get("/", SubcategoryController.getAllSubcategories);
router.get("/:id", SubcategoryController.getSubcategoryById);
router.post("/", SubcategoryController.createSubcategory);

export default router;