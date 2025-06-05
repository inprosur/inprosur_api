import { Router } from "express";
import * as AdvertisingController from "../controllers/advertisingController";

const router = Router();

router.get("/", AdvertisingController.getAllAdvertisings);
router.post("/", AdvertisingController.createAdvertising);

export default router;
