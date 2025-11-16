import { getGlobalConnection } from "../database/connection";
import Empresa from "../models/EmpresaModel";

export default class EmpresaRepository {
  // Busca una empresa por nombre
  async findByName(nombre: string): Promise<Empresa | null> {
    const pool = await getGlobalConnection(); // ✅ conexión global
    const [rows] = await pool.query("SELECT * FROM empresa WHERE nombre = ?", [nombre]);
    const data = (rows as any[])[0];
    if (!data) return null;

    return new Empresa(
      data.id,
      data.nombre,
      data.email_admin,
      data.db_name,
      data.db_user,
      data.db_password,
      data.db_host,
      data.estado
    );
  }

  // Devuelve todas las empresas
  async findAll(): Promise<Empresa[]> {
    const pool = await getGlobalConnection(); // ✅ conexión global
    const [rows] = await pool.query("SELECT * FROM empresa");
    return (rows as any[]).map(
      data =>
        new Empresa(
          data.id,
          data.nombre,
          data.email_admin,
          data.db_name,
          data.db_user,
          data.db_password,
          data.db_host,
          data.estado
        )
    );
  }
}
