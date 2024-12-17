import { validateSignup } from "../../src/middlewares/ValidationMiddleware";
import { Request, Response } from "express";

describe("Middleware de Validação - validateSignup", () => {
  test("Deve retornar erro se os campos obrigatórios estiverem ausentes", () => {
    const req = { body: { email: "test@example.com" } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateSignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Todos os campos (nome, email, senha,login,phone) são obrigatórios",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("Deve retornar erro se o email for inválido", () => {
    const req = {
      body: {
        name: "John",
        email: "emailinvalido",
        password: "123456",
        login: "john",
        phone: "123456789",
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateSignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Um email válido é obrigatório",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("Deve retornar erro se a senha for muito curta", () => {
    const req = {
      body: {
        name: "John",
        email: "john@example.com",
        password: "123",
        login: "john",
        phone: "123456789",
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateSignup(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "A senha deve ter pelo menos 6 caracteres",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("Deve chamar next() quando todos os campos forem válidos", () => {
    const req = {
      body: {
        name: "John",
        email: "john@example.com",
        password: "123456",
        login: "john",
        phone: "123456789",
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    validateSignup(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
