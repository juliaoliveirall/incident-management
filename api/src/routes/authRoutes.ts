import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: realiza login no sistema
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 */
router.post("/login", UserController.login);

export default router;
