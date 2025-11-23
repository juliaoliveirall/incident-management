import { Request, Response } from "express";
import { IncidentModel } from "../models/IncidentModel";
import { SecurityLogsModel } from "../models/SecurityLogsModel";

export const IncidentController = {

  async create(req: Request, res: Response) {
  try {
    const { titulo, descricao, tipo, prioridade, status } = req.body;

    const novoIncidente = await IncidentModel.create({
  titulo,
  descricao,
  tipo,
  prioridade,
  status,
  id_usuario_reportou: (req as any).user.id_usuario
});

    return res.json({
      msg: "Incidente criado com sucesso",
      incident: novoIncidente
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao criar incidente" });
  }
},

  async list(req: Request, res: Response) {
    const user = (req as any).user;
    const incidents = await IncidentModel.getAllByRole(user.cargo, user.id_usuario);

    return res.json(incidents);
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const incidente = await IncidentModel.findById(Number(id));

    if (!incidente) {
      return res.status(404).json({ msg: "Incidente não encontrado" });
    }

    return res.json(incidente);
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const atualizado = await IncidentModel.update(Number(id), data);

    if (!atualizado) {
      return res.status(404).json({ msg: "Incidente não encontrado" });
    }


    await SecurityLogsModel.create({
      id_usuario: (req as any).user.id_usuario,
      acao: "Incidente atualizado",
      ip: req.ip,
      user_agent: req.headers["user-agent"] as string,
      detalhes: `Incidente ID: ${id}`
    });

    return res.json({ msg: "Incidente atualizado com sucesso" });
  },


  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deletado = await IncidentModel.delete(Number(id));

    if (!deletado) {
      return res.status(404).json({ msg: "Incidente não encontrado" });
    }


    await SecurityLogsModel.create({
      id_usuario: (req as any).user.id_usuario,
      acao: "Incidente deletado",
      ip: req.ip,
      user_agent: req.headers["user-agent"] as string,
      detalhes: `Incidente ID: ${id}`
    });

    return res.json({ msg: "Incidente deletado com sucesso" });
  }

};
