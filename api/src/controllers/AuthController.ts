import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

export const UserController = {

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios." });
    }

    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      {
        id: user.id_usuario,
        cargo: user.cargo
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return res.json({
      msg: "Login bem-sucedido",
      token,
      user: {
        id: user.id_usuario,
        nome: user.nome,
        cargo: user.cargo
      }
    });
  }
};
