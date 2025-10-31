import express from "express";
import { IncidentController } from "../controllers/IncidentController";

const router = express.Router();

router.post("/", IncidentController.createIncident);
router.get("/", IncidentController.findAllIncident);
router.get("/:id", IncidentController.findByIdIncident);
router.put("/:id", IncidentController.updateIncident);
router.delete("/:id", IncidentController.deleteIncident);

export default router;
