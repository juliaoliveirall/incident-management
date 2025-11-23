import { db } from "../config/db";
import { SecurityLog } from "../interface/SecurityLogs";

export const SecurityLogsModel = {
    
  async create(log: SecurityLog) {
    await db.query(
      `INSERT INTO security_logs
       (id_usuario, acao, ip, user_agent, detalhes)
       VALUES (?, ?, ?, ?, ?)`,

      [
        log.id_usuario ?? null,
        log.acao,
        log.ip ?? null,
        log.user_agent ?? null,
        log.detalhes ?? null
      ]
    );
  },

  async getAll() {
    const [rows]: any = await db.query(
      `SELECT * FROM security_logs ORDER BY data_registro DESC`
    );
    return rows;
  }

};
