import { db } from "../config/db";

export interface User {
    id_usuario?: number,
    nome: string,
    email: string,
    senha_hash: string,
    cargo?: "comum" | "gestor" | "administrador";
  data_cadastro?: Date;
}

export const UserModel = {

  async create(user: User) {
    const [result]: any = await db.query(
      "INSERT INTO users (nome, email, senha_hash, cargo) VALUES (?, ?, ?, ?)",
      [user.nome, user.email, user.senha_hash, user.cargo || "comum"]
    );
    return result;
  },

  async update(id_usuario: number, user: User) {
    const [result]: any = await db.query(
      "UPDATE users SET nome = ?, email = ?, senha_hash = ?, cargo = ? WHERE id_usuario = ?",
      [user.nome, user.email, user.senha_hash, user.cargo, id_usuario]
    );
    return result;
  },

  async findAll() {
    const [rows]: any = await db.query("SELECT * FROM users");
    return rows;
  },

  async findById(id_usuario: number) {
    const [rows]: any = await db.query("SELECT * FROM users WHERE id_usuario =?", [id_usuario]);
    return rows[0];
  },

  async findByEmail(email: string) {
  const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
},


  async delete(id_usuario: number) {
    const [result]: any = await db.query("DELETE FROM users WHERE id_usuario = ?", [id_usuario]);

    if (result.affectedRows > 0) {
      return `usuário com id ${id_usuario} deletado com sucesso!`
    } else {
      return `nenhum usuário encontrado com o id ${id_usuario}.`
    };
  }
};
