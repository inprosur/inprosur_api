import { Router } from "express";
import * as DegressController from "../controllers/degreeController";

const router = Router();

router.post("/newDegree", DegressController.createDegrees);
router.get("/", DegressController.getAllDegrees);
router.get("/:id", DegressController.getDegreesById);
router.put("/editDegree/:id", DegressController.updateDegrees);
router.delete("/deleteDegree/:id", DegressController.deleteDegrees);


export default router;
