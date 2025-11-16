export default class Producto {
  constructor(
    public id_producto: number | null,
    public nombre: string,
    public descripcion: string | null,
    public precio: number,
    public stock: number,
    public categoria_id : number,
    public precio_compra : number,
    public precio_venta : number,
    public estado : string
    ) {}
}
