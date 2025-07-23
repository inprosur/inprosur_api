import { Router } from "express";
import * as DegressController from "../controllers/degreeController";

const router = Router();

router.get("/", DegressController.getAllDegrees);
router.get("/:id", DegressController.getDegreesById);
router.post("/newDegree", DegressController.createDegrees);

export default router;
