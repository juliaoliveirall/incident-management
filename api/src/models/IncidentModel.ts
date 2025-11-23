import { db } from "../config/db";
import { Incident } from "../interface/Incident";

export const IncidentModel = {

  async create(incident: Incident) {
    const [result]: any = await db.query(
      `INSERT INTO incidents 
        (titulo, descricao, tipo, prioridade, status, id_usuario_reportou)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        incident.titulo,
        incident.descricao,
        incident.tipo ?? null,
        incident.prioridade ?? null,
        incident.status ?? null,
        incident.id_usuario_reportou
      ]
    );

    return {
      id_incidente: result.insertId,
      ...incident
    };
  },

  async getAllByRole(papel: string, userId: number) {
    if (papel === "comum") {
      const [rows] = await db.query(
        `SELECT * FROM incidents WHERE id_usuario_reportou = ? ORDER BY data_registro DESC`,
        [userId]
      );
      return rows;
    }

    const [rows] = await db.query(`SELECT * FROM incidents ORDER BY data_registro DESC`);
    return rows;
  },

  async findById(id: number) {
    const [rows]: any = await db.query(
      `SELECT * FROM incidents WHERE id_incidente = ?`,
      [id]
    );
    return rows.length ? rows[0] : null;
  },

  async update(id: number, data: Partial<Incident>) {
    const fields = Object.keys(data)
      .map(field => `${field} = ?`)
      .join(", ");

    const values = Object.values(data);

    const [result]: any = await db.query(
      `UPDATE incidents SET ${fields} WHERE id_incidente = ?`,
      [...values, id]
    );

    return result.affectedRows > 0;
  },

  async delete(id: number) {
    const [result]: any = await db.query(
      `DELETE FROM incidents WHERE id_incidente = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
};
