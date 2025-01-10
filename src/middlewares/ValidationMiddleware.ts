import { Request, Response, NextFunction, RequestHandler } from "express";

// Middleware de validação para a rota de criação de usuário
export const validateSignup: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password, login, phone } = req.body;

  if (!name || !email || !password || !login || !phone) {
    res.status(400).json({
      error:
        "Todos os campos (nome, email, senha,login,phone) são obrigatórios",
    });
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

export const validateProspect: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, celular, whatsapp, facebook } = req.body;

  if (!name) {
    res.status(400).json({ error: "Nome inválido ou ausente" });
    return;
  }

  if (typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Email inválido ou ausente" });
    return;
  }

  if (!celular) {
    res.status(400).json({ error: "Celular inválido ou ausente" });
    return;
  }

  if (!whatsapp) {
    res.status(400).json({ error: "Whatsapp inválido" });
    return;
  }

  if (!facebook) {
    res.status(400).json({ error: "Facebook inválido" });
    return;
  }

  next();
};
