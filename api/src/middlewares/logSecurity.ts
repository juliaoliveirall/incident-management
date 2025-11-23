import { Request, Response, NextFunction } from "express";
import { SecurityLogsModel } from "../models/SecurityLogsModel";

export const logSecurity = (acao: string, detalhes?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    await SecurityLogsModel.create({
      id_usuario: (req as any).user?.id_usuario ?? null,
      acao,
      ip: req.ip,
      user_agent: req.headers["user-agent"] as string,
      detalhes: detalhes ?? undefined
    });

    next();
  };
};
