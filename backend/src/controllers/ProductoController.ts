import { Request, Response } from "express";
import ProductoRepository from "../repositories/ProductoRepository";
import ProductoService from "../services/ProductoServices";
import { AuthRequest } from "../middlewares/authMiddleware";

export default class ProductoController {
  async getAll(req: AuthRequest, res: Response) {
    const repo = new ProductoRepository(req.db!);
    const service = new ProductoService(repo);
    res.json(await service.getAll());
  }

  async getById(req: AuthRequest, res: Response) {
    const repo = new ProductoRepository(req.db!);
    const service = new ProductoService(repo);

    const producto = await service.getById(Number(req.params.id));
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(producto);
  }

  async create(req: AuthRequest, res: Response) {
    const repo = new ProductoRepository(req.db!);
    const service = new ProductoService(repo);

    const id = await service.create(req.body);
    res.status(201).json({ id });
  }

  async update(req: AuthRequest, res: Response) {
    const repo = new ProductoRepository(req.db!);
    const service = new ProductoService(repo);

    const ok = await service.update(Number(req.params.id), req.body);
    if (!ok) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Actualizado" });
  }

  async delete(req: AuthRequest, res: Response) {
    const repo = new ProductoRepository(req.db!);
    const service = new ProductoService(repo);

    const ok = await service.delete(Number(req.params.id));
    if (!ok) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Eliminado" });
  }
}
