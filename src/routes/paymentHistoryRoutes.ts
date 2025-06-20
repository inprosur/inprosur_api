import { Router } from "express";
import * as PaymentHistoryController from "../controllers/paymentHistoryController";

const router = Router();

router.get("/", PaymentHistoryController.getAllPaymentHistories);
router.get("/:id", PaymentHistoryController.getPaymentHistoryById);
router.post("/", PaymentHistoryController.createPaymentHistory);

export default router;
