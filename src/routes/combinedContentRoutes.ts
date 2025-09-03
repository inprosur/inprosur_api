import { Router } from "express";
import * as CombinedContentController from "../controllers/combinedContentController";

const router = Router();

router.get("/by-lesson/:lessonId", CombinedContentController.getCombinedContent);
router.put("/reorder", CombinedContentController.reorderContent);

export default router;