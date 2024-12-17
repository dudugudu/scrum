export const mockPrismaClient = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

const PrismaClientMock = jest.fn().mockImplementation(() => mockPrismaClient);

export { PrismaClientMock as PrismaClient };
