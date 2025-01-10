jest.mock("@prisma/client", () => require("../../__mocks__/prismaClient"));

import { ProspectService } from "../../src/services/ProspectService";
import { mockPrismaClient } from "../../__mocks__/prismaClient";

const prospectService = new ProspectService();

describe("Serviço de Prospect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar todos os prospects", async () => {
    const mockProspects = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        celular: "123456789",
      },
    ];
    mockPrismaClient.prospect.findMany.mockResolvedValue(mockProspects);

    const result = await prospectService.getAll();
    expect(mockPrismaClient.prospect.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockProspects);
  });

  it("deve buscar um prospect por ID", async () => {
    const mockProspect = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      celular: "123456789",
    };
    mockPrismaClient.prospect.findUnique.mockResolvedValue(mockProspect);

    const result = await prospectService.getById(1);
    expect(mockPrismaClient.prospect.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockProspect);
  });

  it("deve criar um novo prospect", async () => {
    const mockProspect = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      celular: "123456789",
    };
    mockPrismaClient.prospect.create.mockResolvedValue(mockProspect);

    const result = await prospectService.create({
      name: "John Doe",
      email: "john@example.com",
      celular: "123456789",
    });
    expect(mockPrismaClient.prospect.create).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        email: "john@example.com",
        celular: "123456789",
      },
    });
    expect(result).toEqual(mockProspect);
  });

  it("deve atualizar um prospect", async () => {
    const mockUpdatedProspect = {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
      celular: "987654321",
    };
    mockPrismaClient.prospect.update.mockResolvedValue(mockUpdatedProspect);

    const result = await prospectService.update(1, {
      name: "Jane Doe",
      email: "jane@example.com",
      celular: "987654321",
    });
    expect(mockPrismaClient.prospect.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        name: "Jane Doe",
        email: "jane@example.com",
        celular: "987654321",
      },
    });
    expect(result).toEqual(mockUpdatedProspect);
  });

  it("deve deletar um prospect", async () => {
    mockPrismaClient.prospect.delete.mockResolvedValue({ id: 1 });

    const result = await prospectService.delete(1);
    expect(mockPrismaClient.prospect.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual({ id: 1 });
  });
});
