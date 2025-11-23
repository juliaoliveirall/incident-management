import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { role } from "../middlewares/role";

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários (somente gestor ou administrador)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", authMiddleware, role(["gestor"]), UserController.getAll);
router.delete("/:id", authMiddleware, role(["gestor"]), UserController.delete);
router.put("/:id", authMiddleware, role(["gestor"]), UserController.update);
router.post("/",authMiddleware,role(["gestor"]),UserController.create);





export default router;
