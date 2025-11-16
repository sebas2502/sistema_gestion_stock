import Producto from "../models/ProductoModel";
import ProductoRepository from "../repositories/ProductoRepository";

export default class ProductoService {
  constructor(private repo: ProductoRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  getById(id: number) {
    return this.repo.findById(id);
  }

  create(data: any) {
    const producto = new Producto(
      null,
      data.nombre,
      data.descripcion || null,
      data.precio,
      data.stock,
      data.categoria_id,
      data.precio_compra,
      data.precio_compra,
      data.estado
    );
    return this.repo.create(producto);
  }

  update(id: number, data: any) {
    const producto = new Producto(
      id,
      data.nombre,
      data.descripcion || null,
      data.precio,
      data.stock,
       data.categoria_id,
      data.precio_compra,
      data.precio_compra,
      data.estado
    );
    return this.repo.update(id, producto);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
