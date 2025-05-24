import { Router } from "express";
import * as CommissionController from "../controllers/commissionController";

const router = Router();

router.post("/newCommission", CommissionController.createCommission);

export default router;
