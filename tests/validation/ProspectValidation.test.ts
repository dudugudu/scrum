import { validateProspect } from "../../src/middlewares/ValidationMiddleware";
import { Request, Response } from "express";

describe("Middleware de Validação de Prospect", () => {
  it("deve retornar 400 se o nome estiver ausente", async () => {
    const req = {
      body: { email: "test@example.com", celular: "123456789" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateProspect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Nome inválido ou ausente",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se o email estiver ausente", async () => {
    const req = { body: { name: "John Doe", celular: "123456789" } } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateProspect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Email inválido ou ausente",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve retornar 400 se o celular estiver ausente", async () => {
    const req = {
      body: { name: "John Doe", email: "test@example.com" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validateProspect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Celular inválido ou ausente",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("deve passar na validação com todos os campos obrigatórios", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        celular: "123456789",
        whatsapp: "123456789",
        facebook: "facebook.com",
      },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    validateProspect(req, res, next);

    expect(res.status).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalled();
  });
});
