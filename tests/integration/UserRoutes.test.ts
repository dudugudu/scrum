import request from "supertest";
import app from "../../src/index";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("User Routes", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // Limpa a tabela de usuários antes dos testes
  });

  test("Deve criar um usuário com sucesso", async () => {
    const response = await request(app).post("/api/users/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("john@example.com");
  });

  test("Deve validar login com sucesso", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "john@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("john@example.com");
  });

  test("Deve retornar erro para login inválido", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "invalid@example.com", password: "password123" });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Email ou senha inválidos");
  });
});
