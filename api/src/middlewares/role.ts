import { Request, Response, NextFunction } from "express";
import { SecurityLogsModel } from "../models/SecurityLogsModel";

export const role = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
      return res.status(401).json({ msg: "Não autenticado" });
    }

    if (!allowedRoles.includes(req.user.cargo)) {

      await SecurityLogsModel.create({
        id_usuario: (req as any).user.id_usuario,
        acao: "Acesso negado",
        ip: req.ip,
        user_agent: req.headers["user-agent"] as string,
        detalhes: `Tentou acessar: ${req.method} ${req.originalUrl}`
      });

      return res.status(403).json({ msg: "Acesso negado" });
    }

    next();
  };
};
