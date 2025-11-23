import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import { SecurityLogsModel } from "../models/SecurityLogsModel";

export const UserController = {

  async create(req: Request, res: Response) {
  const { nome, email, senha, cargo } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ msg: "Nome, email e senha são obrigatórios." });
  }

  const existente = await UserModel.findByEmail(email);
  if (existente) {
    return res.status(400).json({ msg: "Usuário já existe." });
  }

  const senha_hash = await bcrypt.hash(senha, 10);

  const novo = await UserModel.create({
    nome,
    email,
    senha_hash,
    cargo: cargo || "comum"
  });

  await SecurityLogsModel.create({
    id_usuario: (req as any).user.id_usuario,
    acao: "Usuário criado",
    ip: req.ip,
    user_agent: req.headers["user-agent"] as string,
    detalhes: `Novo usuário: ${email}`
  });

  return res.status(201).json({
    msg: "Usuário criado com sucesso",
    id: novo.insertId
  });
},

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios." });
    }

    const user = await UserModel.findByEmail(email);

    if (!user) {
      await SecurityLogsModel.create({
        id_usuario: null,
        acao: "Tentativa de login mal-sucedida",
        ip: req.ip,
        user_agent: req.headers["user-agent"] as string,
        detalhes: `Email inexistente: ${email}`
      });

      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);


    if (!senhaValida) {
      await SecurityLogsModel.create({
        id_usuario: user.id_usuario,
        acao: "Tentativa de login mal-sucedida",
        ip: req.ip,
        user_agent: req.headers["user-agent"] as string,
        detalhes: `Senha incorreta para o email: ${email}`
      });

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

    await SecurityLogsModel.create({
      id_usuario: user.id_usuario,
      acao: "Login realizado com sucesso",
      ip: req.ip,
      user_agent: req.headers["user-agent"] as string,
      detalhes: `Cargo: ${user.cargo}`
    });

    return res.json({
      msg: "Login bem-sucedido",
      token,
      user: {
        id: user.id_usuario,
        nome: user.nome,
        cargo: user.cargo
      }
    });
  },
  async update(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;

  const atualizado = await UserModel.update(Number(id), data);

  if (!atualizado) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }


  await SecurityLogsModel.create({
    id_usuario: (req as any).user.id_usuario,
    acao: "Usuário atualizado",
    ip: req.ip,
    user_agent: req.headers["user-agent"] as string,
    detalhes: `Usuário ID alterado: ${id}`
  });

  return res.json({ msg: "Usuário atualizado com sucesso" });
},
async delete(req: Request, res: Response) {
  const { id } = req.params;

  const deletado = await UserModel.delete(Number(id));

  if (!deletado) {
    return res.status(404).json({ msg: "Usuário não encontrado" });
  }


  await SecurityLogsModel.create({
    id_usuario: (req as any).user.id_usuario,
    acao: "Usuário deletado",
    ip: req.ip,
    user_agent: req.headers["user-agent"] as string,
    detalhes: `Usuário ID deletado: ${id}`
  });

  return res.json({ msg: "Usuário deletado com sucesso" });
},

async getAll(req: Request, res: Response) {
  const users = await UserModel.getAll();

  return res.json(users);
},





};
