import { Router } from "express";
import {
  get,
  checkUserDB,
  onLogin,
  onLogout,
  onLoginByPassword,
  onLoginByMagicLink,
  onRegister,
} from "../controllers/web.controllers.js";

const router = Router();

// Endpoints

router.get("/api/checkUserDB", checkUserDB);

router.get("/api/onLogout", onLogout);

router.post("/api/onLogin/password", onLoginByPassword);

router.post("/api/onLogin/magic-link", onLoginByMagicLink);

router.post("/api/onRegister", onRegister);

// Prueba

router.get("/api/onLogin", onLogin);

router.get("/api/get", get);

export default router;
