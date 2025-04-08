import { Router } from "express"; // ← esto importa correctamente Router
import { createReport, getReports, updateReport, deleteReport} from "../controllers/report.controller.js";

const router = Router();

router.post("/api/reports", createReport);
router.get("/api/reports", getReports);
router.delete("/api/reports/:id", deleteReport);
router.put("/api/reports/:id", updateReport);


export default router;
