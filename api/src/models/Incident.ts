import { db } from "../config/db";

export interface Incident {
  id_incidente?: number;
  titulo: string;
  descricao: string;
  tipo?: "físico" | "digital" | "interno";
  prioridade?: "baixa" | "média" | "alta";
  status?: "aberto" | "em análise" | "resolvido";
  id_usuario_reportou: number;
  data_registro?: Date;
}

export const IncidentsModel = {
  async createIncident(incident: Incident) {
    const [result]: any = await db.query(
      "INSERT INTO incidentes (titulo, descricao, tipo, prioridade, status, id_usuario_reportou) VALUES (?, ?, ?, ?, ?, ?)",
      [
        incident.titulo,
        incident.descricao,
        incident.tipo || "digital",
        incident.prioridade || "média",
        incident.status || "aberto",
        incident.id_usuario_reportou,
      ]
    );
    return result;
  },

  async updateIncident(id_incidente: number, incident: Incident) {
    const [result]: any = await db.query(
      "UPDATE incidentes SET titulo = ?, descricao = ?, tipo = ?, prioridade = ?, status = ? WHERE id_incidente = ?",
      [
        incident.titulo,
        incident.descricao,
        incident.tipo,
        incident.prioridade,
        incident.status,
        id_incidente,
      ]
    );
    return result;
  },

  async findAllIncidents() {
    const [rows]: any = await db.query("SELECT * FROM incidentes");

    return rows.map((r: any) => ({
      id: r.id_incidente,
      title: r.titulo,
      description: r.descricao,
      status: r.status,
      created_at: r.data_registro,
      type: r.tipo,
      priority: r.prioridade,
      user_id: r.id_usuario_reportou,
    }));
  },
  async findIncidentById(id_incidente: number) {
    const [rows]: any = await db.query(
      "SELECT * FROM incidentes WHERE id_incidente = ?",
      [id_incidente]
    );

    if (!rows[0]) return null;

    const r = rows[0];

    return {
      id: r.id_incidente,
      title: r.titulo,
      description: r.descricao,
      status: r.status,
      created_at: r.data_registro,
      type: r.tipo,
      priority: r.prioridade,
      user_id: r.id_usuario_reportou,
    };
  },
  async deleteIncident(id_incidente: number) {
    const [result]: any = await db.query(
      "DELETE FROM incidentes WHERE id_incidente = ?",
      [id_incidente]
    );
    return result;
  },
};
