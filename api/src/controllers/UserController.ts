import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const UserController = {
  async create(req: Request, res: Response) {
    try {
      const newUser = await UserModel.create(req.body);
      return res.status(201).json({ message: "usuário criado com sucesso!", newUser });
    } catch (error) {
      console.error("erro ao criar usuário:", error);
      return res.status(500).json({ message: "erro ao criar usuário." });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error("erro ao buscar usuários:", error);
      return res.status(500).json({ message: "erro ao buscar usuários." });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: "usuário não encontrado." });
      return res.status(200).json(user);
    } catch (error) {
      console.error("erro ao buscar usuário:", error);
      return res.status(500).json({ message: "erro ao buscar usuário." });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const updatedUser = await UserModel.update(id, req.body);
      return res.status(200).json({ message: "usuário atualizado com sucesso!", updatedUser });
    } catch (error) {
      console.error("erro ao atualizar usuário:", error);
      return res.status(500).json({ message: "erro ao atualizar usuário." });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const result = await UserModel.delete(id);
      return res.status(200).json({ message: result });
    } catch (error) {
      console.error("erro ao deletar usuário:", error);
      return res.status(500).json({ message: "erro ao deletar usuário." });
    }
  },
};
