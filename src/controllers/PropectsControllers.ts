import { Request, Response } from "express";
import { ProspectService } from "../services/ProspectService";

const service = new ProspectService();

export class ProspectController {
  async getAll(req: Request, res: Response) {
    const prospects = await service.getAll();
    res.json(prospects);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const prospect = await service.getById(id);
    if (prospect) res.json(prospect);
    else res.status(404).send("Prospect não encontrado");
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const prospect = await service.create(data);
    res.status(201).json(prospect);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    const prospect = await service.update(id, data);
    res.json(prospect);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.delete(id);
    res.status(204).send();
  }
}
