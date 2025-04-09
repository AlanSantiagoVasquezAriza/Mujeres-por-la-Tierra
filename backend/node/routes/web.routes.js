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

// Rutas para /checkUserDB
router.route("/checkUserDB").get(checkUserDB);

// Rutas para /onLogout
router.route("/onLogout").get(onLogout);

// Rutas para /onLogin/password 
router.route("/onLogin/password").post(onLoginByPassword);

// Rutas para /onLogin/magic-link
router.route("/onLogin/magic-link").post(onLoginByMagicLink);

// Rutas para /onRegister
router.route("/onRegister").post(onRegister);


// Prueba
router.get("/onLogin", onLogin);
router.get("/get", get);

export default router;
