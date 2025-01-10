import request from "supertest";
import express from "express";
import prospectRoutes from "../../src/routes/prospectRoutes";

const app = express();
app.use(express.json());
app.use("/api", prospectRoutes);

describe("Middleware de Validação de Prospect na Criação", () => {
  const prospectoValido = {
    name: "John Doe",
    email: "john@example.com",
    celular: "123456789",
  };

  it("deve retornar 400 se o nome estiver ausente", async () => {
    const { name, ...prospectoInvalido } = prospectoValido;
    const response = await request(app)
      .post("/api/prospects")
      .send(prospectoInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Nome inválido ou ausente");
  });

  it("deve retornar 400 se o email estiver ausente", async () => {
    const { email, ...prospectoInvalido } = prospectoValido;
    const response = await request(app)
      .post("/api/prospects")
      .send(prospectoInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Email inválido ou ausente");
  });

  it("deve retornar 400 se o celular estiver ausente", async () => {
    const { celular, ...prospectoInvalido } = prospectoValido;
    const response = await request(app)
      .post("/api/prospects")
      .send(prospectoInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Celular inválido ou ausente"
    );
  });

  it("deve passar na validação e criar o prospect com todos os campos obrigatórios", async () => {
    const newUser = {
      name: "John Doe",
      email: `test${Date.now()}@example.com`,
      facebook: "facebook.com",
      whatsapp: "123456789",
      celular: "123456789",
    };
    const response = await request(app).post("/api/prospects").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    const { id, ...newUserWithoutId } = response.body;
    expect(newUserWithoutId).toStrictEqual(newUser);
  });
});
