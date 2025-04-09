import { Router } from "express";
import {
  getCurrentUserController,
  loginWithMagicLinkController,
  loginWithPasswordController,
  logoutController,
  registerUserController,
} from "../controllers/web.controllers.js";

const router = Router();

// Endpoints

router.get("/auth/user", getCurrentUserController);

router.get("/auth/logout", logoutController);

router.post("/auth/login/password", loginWithPasswordController);

router.post("/auth/login/magic-link", loginWithMagicLinkController);

router.post("/auth/register", registerUserController);

export default router;
