import { Router } from "express";
import { get } from "../controllers/web.controllers.js";

const router = Router();

// Endpoints
router.get("/api/get", get);

export default router;
