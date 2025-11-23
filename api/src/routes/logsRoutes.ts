import { Router } from "express";
import { LogsController } from "../controllers/LogsController";
import { authMiddleware } from "../middlewares/auth";
import { role } from "../middlewares/role";

const router = Router();

router.get("/", authMiddleware, role(["administrador"]), LogsController.list);

export default router;
