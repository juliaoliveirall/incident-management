import { Request, Response } from "express";
import { IncidentsModel } from "../models/Incident"; 

export const IncidentController = {
  
  async createIncident(req: Request, res: Response) {
    try {
      const result = await IncidentsModel.createIncident(req.body);
      
      return res.status(201).json({ 
        message: "incidente criado com sucesso!", 
        insertId: result.insertId 
      });

    } catch (error) {
      console.error("erro ao criar incidente:", error);
      return res.status(500).json({ message: "erro ao criar incidente." });
    }
  },

  async findAllIncident(req: Request, res: Response) {
    try {
      const incidents = await IncidentsModel.findAllIncidents();
      return res.status(200).json(incidents);
    } catch (error) {
      console.error("erro ao buscar incidentes:", error);
      return res.status(500).json({ message: "erro ao buscar incidentes." });
    }
  },

  async findByIdIncident(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const incident = await IncidentsModel.findIncidentById(id);
      
      if (!incident) {
        return res.status(404).json({ message: "incidente não encontrado." });
      }

      return res.status(200).json(incident);

    } catch (error) {
      console.error("erro ao buscar incidente:", error);
      return res.status(500).json({ message: "erro ao buscar incidente." });
    }
  },

  async updateIncident(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const result = await IncidentsModel.updateIncident(id, req.body);

      if (result.affectedRows === 0) {
         return res.status(404).json({ message: "incidente não encontrado para atualização." });
      }

      return res.status(200).json({ message: "incidente atualizado com sucesso!" });

    } catch (error) {
      console.error("erro ao atualizar incidente:", error);
      return res.status(500).json({ message: "erro ao atualizar incidente." });
    }
  },

  async deleteIncident(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido." });
      }

      const result = await IncidentsModel.deleteIncident(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "incidente não encontrado para exclusão." });
      }

      return res.status(200).json({ message: "incidente deletado com sucesso!" });
      
    } catch (error) {
      console.error("erro ao deletar incidente:", error);
      return res.status(500).json({ message: "erro ao deletar incidente." });
    }
  },
};