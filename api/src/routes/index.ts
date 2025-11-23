import { Router } from "express";

import authRoutes from "./authRoutes";
import usersRoutes from "./usersRoutes";
import incidentRoutes from "./incidentRoutes";
import logsRoutes from "./logsRoutes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usersRoutes);
router.use("/incidentes", incidentRoutes);
router.use("/logs", logsRoutes);

export default router;
