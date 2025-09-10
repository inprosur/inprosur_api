import { Router } from "express";
import * as PromotionController from "../controllers/promotionController";

const router = Router();

router.get("/", PromotionController.getAllPromotions);
router.get("/:id", PromotionController.getPromotionById);
router.post("/", PromotionController.createPromotion);
router.put("/:id", PromotionController.updatePromotion);
router.delete("/:id", PromotionController.deletePromotion);

export default router;
