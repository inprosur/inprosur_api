import { Router } from "express";
import * as DegressController from "../controllers/degreeController";

const router = Router();

router.post("/newDegree", DegressController.createDegrees);
router.get("/", DegressController.getAllDegrees);
router.get("/:id", DegressController.getDegreesById);

export default router;
