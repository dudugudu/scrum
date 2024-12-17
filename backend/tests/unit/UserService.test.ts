jest.mock("@prisma/client", () => require("../../__mocks__/prismaClient"));

import { UserService } from "../../src/services/UserService";
import { mockPrismaClient } from "../../__mocks__/prismaClient";

const userService = new UserService();

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar um usuário com sucesso", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    mockPrismaClient.user.create.mockResolvedValue(mockUser);

    const result = await userService.createUser(
      "John Doe",
      "john@example.com",
      "password123"
    );

    expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    });
    expect(result).toEqual(mockUser);
  });

  test("Deve retornar erro se email não for encontrado", async () => {
    mockPrismaClient.user.findUnique.mockResolvedValue(null);

    await expect(
      userService.validateLogin("john@example.com", "password123")
    ).rejects.toThrow("Email ou senha inválidos");
  });

  test("Deve retornar erro se senha estiver incorreta", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

    await expect(
      userService.validateLogin("john@example.com", "wrongpassword")
    ).rejects.toThrow("Email ou senha inválidos");
  });
});
