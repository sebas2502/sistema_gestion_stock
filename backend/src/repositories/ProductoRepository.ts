import { Pool } from "mysql2/promise";
import Producto from "../models/ProductoModel";

export default class ProductoRepository {
  constructor(private db: Pool) {}

  async findAll(): Promise<Producto[]> {
    const [rows] = await this.db.query("SELECT * FROM producto");
    return (rows as any[]).map(
      p => new Producto(
           p.id_producto,
           p.nombre,
           p.descripcion,
           p.precio,
           p.stock,
           p.categoria_id,
           p.precio_compra,
           p.precio_venta,
           p.estado
        )
    );
  }

  async findById(id: number): Promise<Producto | null> {
    const [rows] = await this.db.query("SELECT * FROM producto WHERE id = ?", [id]);
    const data = (rows as any[])[0];
    if (!data) return null;
    return new Producto(
           data.id_producto,
           data.nombre,
           data.descripcion,
           data.precio,
           data.stock,
           data.categoria_id,
           data.precio_compra,
           data.precio_venta,
           data.estado
    );
  }

  async create(producto: Producto): Promise<number> {
    const [result]: any = await this.db.query(
      "INSERT INTO producto (nombre, descripcion, precio, stock, categoria_id,precio_compra,precio_venta,estado) VALUES (?, ?, ?, ?)",
      [
           producto.nombre,
           producto.descripcion,
           producto.precio,
           producto.stock,
           producto.categoria_id,
           producto.precio_compra,
           producto.precio_venta,
           producto.estado
      ]
    );
    return result.insertId;
  }

  async update(id: number, producto: Producto): Promise<boolean> {
    const [result]: any = await this.db.query(
      "UPDATE producto SET nombre=?, descripcion=?, precio=?, stock=?, categoria_id=?, precio_compra=?.precio_venta=?,estado=? WHERE id=?",
      [
        producto.nombre,
        producto.descripcion,
        producto.precio,
        producto.stock,
        producto.categoria_id,
        producto.precio_compra,
        producto.precio_venta,
        producto.estado,
        id
      ]
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await this.db.query("DELETE FROM producto WHERE id=?", [id]);
    return result.affectedRows > 0;
  }
}
