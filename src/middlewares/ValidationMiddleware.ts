import { Request, Response, NextFunction, RequestHandler } from "express";

// Middleware de validação para a rota de criação de usuário
export const validateSignup: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ error: "Todos os campos (nome, email, senha) são obrigatórios" });
    return; // Garante que a função retorne após enviar a resposta
  }

  if (typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Um email válido é obrigatório" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres" });
    return;
  }

  next(); // Continua para o próximo middleware/controller
};
