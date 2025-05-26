import { Router } from "express";
import * as AccessLogController from "../controllers/accessLogController";

const router = Router();

router.get("/", AccessLogController.getAllAccessLogs);
router.get("/:id", AccessLogController.getAccessLogById);
router.post("/newAccessLog", AccessLogController.createAccessLog);

export default router;