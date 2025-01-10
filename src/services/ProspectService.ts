import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProspectService {
  async getAll() {
    return prisma.prospect.findMany();
  }

  async getById(id: number) {
    return prisma.prospect.findUnique({ where: { id } });
  }

  async create(data: {
    name: string;
    email: string;
    whatsapp?: string;
    facebook?: string;
    celular: string;
  }) {
    return prisma.prospect.create({ data });
  }

  async update(
    id: number,
    data: {
      name?: string;
      email?: string;
      whatsapp?: string;
      facebook?: string;
      celular?: string;
    }
  ) {
    return prisma.prospect.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.prospect.delete({ where: { id } });
  }
}
