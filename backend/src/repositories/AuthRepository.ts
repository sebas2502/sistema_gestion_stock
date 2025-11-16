import { Pool } from "mysql2/promise";

export default class AuthRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  // 🔹 Busca una empresa por nombre en la base "sistema_global"
  async findCompanyByName(nombre: string) {
    const [rows]: any = await this.pool.query(
      "SELECT * FROM empresa WHERE nombre = ?",
      [nombre]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // 🔹 Busca un usuario por email en la base de la empresa
  async findUserByEmail(email: string) {
  const [rows]: any = await this.pool.query(
    "SELECT * FROM usuario WHERE email = ?",
    [email]
  );
  const data = (rows as any[])[0];
  if (!data) return null;

  // Usamos password_hash en vez de password
  return {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
    passwordHash: data.password_hash, // 🔹 clave renombrada
  };
}
}
