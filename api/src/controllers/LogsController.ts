import { Request, Response } from "express";
import { SecurityLogsModel } from "../models/SecurityLogsModel";

export const LogsController = {
  async list(req: Request, res: Response) {
    const logs = await SecurityLogsModel.getAll();
    return res.json(logs);
  }
};
