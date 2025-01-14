import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, login, phone } = req.body;
    try {
      const user = await userService.createUser({
        name,
        email,
        password,
        login,
        phone,
      });
      res.status(201).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Ocorreu um erro inesperado" });
      }
    }
  }

  async login(req: Request, res: Response) {
    const { login, password } = req.body;
    try {
      const user = await userService.validateLogin(login, password);
      res.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(401).json({ error: "Ocorreu um erro inesperado" });
      }
    }
  }
}
