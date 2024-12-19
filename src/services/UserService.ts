import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserService {
  async createUser(data: any) {
    return await prisma.user.create({
      data,
    });
  }

  async validateLogin(login: string, password: string) {
    const user = await prisma.user.findUnique({ where: { login } });
    if (!user || user.password !== password) {
      throw new Error("login ou senha inválidos");
    }
    return user;
  }
}
