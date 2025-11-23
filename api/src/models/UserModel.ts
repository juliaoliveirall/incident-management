import { db } from "../config/db";
import { User } from "../interface/User";

export const UserModel = {

  async create(user: User) {
    const [result]: any = await db.query(
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
    const [rows]: any = await db.query(
      "SELECT id_usuario, nome, email, cargo FROM users WHERE id_usuario = ?",
      [id]
    );
    return rows[0];
  },

  async update(id: number, data: Partial<User>) {
    const fields = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(", ");

    const values = Object.values(data);

    const [result]: any = await db.query(
      `UPDATE users SET ${fields} WHERE id_usuario = ?`,
      [...values, id]
    );

    return result.affectedRows > 0;
  },

  async delete(id: number) {
    const [result]: any = await db.query(
      "DELETE FROM users WHERE id_usuario = ?",
      [id]
    );

    return result.affectedRows > 0;
  },

  async getAll() {
  const [rows]: any = await db.query(
    "SELECT id_usuario, nome, email, cargo, data_cadastro FROM users"
  );
  return rows;
}

};
