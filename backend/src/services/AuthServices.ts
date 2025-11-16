// src/services/authService.ts
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { jwtConfig } from "../config/jwtConfig";
import { getGlobalConnection, getCompanyConnection } from "../database/connection";
import AuthRepository from "../repositories/AuthRepository";

export default class AuthService {
  async login(empresa: string, email: string, password: string) {
    // 🔹 1. Conectarse a la base global
    const globalConn = await getGlobalConnection();
    const globalRepo = new AuthRepository(globalConn);

    // 🔹 2. Buscar empresa por nombre
    const company = await globalRepo.findCompanyByName(empresa);
    if (!company) throw new Error("Empresa no encontrada");

    // 🔹 3. Conectarse a la base de esa empresa
    const companyConn = await getCompanyConnection(company.db_name);
    const companyRepo = new AuthRepository(companyConn);

    // 🔹 4. Buscar usuario por email
    const user = await companyRepo.findUserByEmail(email);
  
    
    if (!user || !user.passwordHash) {
      throw new Error("Usuario o contraseña inválidos");
    }
    // 🔹 5. Validar contraseña con bcrypt
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) throw new Error("Contraseña incorrecta");

    // 🔹 6. Generar token JWT

    const secret : Secret = jwtConfig.secret;
    const options : SignOptions = { expiresIn: jwtConfig.expiresIn as any }
    const token = jwt.sign(
      { id: user.id, email: user.email, empresa: company.nombre },
      jwtConfig.secret,
      options
    );

    return {
      message: "Login exitoso",
      token,
      company,
      user: { id: user.id, email: user.email, nombre: user.nombre },
    };
  }
}
