import { Router } from "express"; // ← esto importa correctamente Router
import { createReport, getReports, updateReport, deleteReport} from "../controllers/report.controller.js";

const router = Router();

// Rutas para /api/reports
router.route("/")
  .get(getReports)
  .post(createReport);

// Rutas para /api/reports/:id
router.route("/:id")
  .delete(deleteReport)
  .put(updateReport);

export default router;
