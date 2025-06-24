import { Router } from "express";
import * as NotificationController from "../controllers/notificationController";

const router = Router();

router.post("/newNotification", NotificationController.createNotification);

export default router;
