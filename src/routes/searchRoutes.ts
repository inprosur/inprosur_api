import { Router } from "express";
import * as SearchController from "../controllers/searchController";

const router = Router();

router.get("/content", SearchController.searchCourses);
export default router;
