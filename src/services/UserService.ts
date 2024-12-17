import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserService {
  async createUser(name: string, email: string, password: string) {
    return await prisma.user.create({
      data: { name, email, password },
    });
  }

  async validateLogin(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new Error("Email ou senha inválidos");
    }
    return user;
  }
}
