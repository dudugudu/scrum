export const mockPrismaClient = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  prospect: {
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

const PrismaClientMock = jest.fn().mockImplementation(() => mockPrismaClient);

export { PrismaClientMock as PrismaClient };
