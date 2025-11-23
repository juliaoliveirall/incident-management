import { Router } from "express";
import { IncidentController } from "../controllers/IncidentController";
import { authMiddleware } from "../middlewares/auth";
import { role } from "../middlewares/role"

const router = Router();

/**
 * @swagger
 * /incidentes:
 *   post:
 *     summary: Cria um novo incidente
 *     tags: [Incidentes]
 *     security:
 *       - bearerAuth: []     # Requer token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descricao
 *               - id_usuario_reportou
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Falha no servidor"
 *               descricao:
 *                 type: string
 *                 example: "O servidor caiu às 15h e não está respondendo."
 *               tipo:
 *                 type: string
 *                 enum: [físico, digital, interno, outro]
 *                 example: "digital"
 *               prioridade:
 *                 type: string
 *                 enum: [baixa, média, alta]
 *                 example: "alta"
 *               status:
 *                 type: string
 *                 enum: ["aberto", "em análise", "resolvido"]
 *                 example: "aberto"
 *               id_usuario_reportou:
 *                 type: number
 *                 example: 3
 *     responses:
 *       201:
 *         description: Incidente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_incidente:
 *                   type: number
 *                   example: 15
 *                 titulo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 prioridade:
 *                   type: string
 *                 status:
 *                   type: string
 *                 id_usuario_reportou:
 *                   type: number
 *                 data_registro:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 */
router.post("/", authMiddleware, IncidentController.create);

router.get("/", authMiddleware, IncidentController.list);

router.get("/:id", authMiddleware, IncidentController.getById);

router.put("/:id", authMiddleware, IncidentController.update);

router.delete("/:id", authMiddleware, role(["administrador"]), IncidentController.delete);

export default router;
