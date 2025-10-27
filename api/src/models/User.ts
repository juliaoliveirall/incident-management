import { db } from "../config/db";

export interface User {
    id_usuario?: number,
    nome: string,
    email: string,
    senha_hash: string,
    cargo?: "comum" | "gestor" | "administrador"; // opcional, padrão "comum"
  data_cadastro?: Date;
}

export const UserModel = {
  async create(user: User) {
    const [result] = await db.query(
      "INSERT INTO users (nome, email, senha_hash, cargo) VALUES (?, ?, ?, ?)",
      [user.nome, user.email, user.senha_hash, user.cargo || "comum"]
    );
    return result;
  },

  async findByEmail(email: string) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  async findById(id: number) {
    const [rows]: any = await db.query("SELECT id_usuario, nome, email, cargo FROM users WHERE id_usuario = ?", [id]);
    return rows[0];
  }
};
