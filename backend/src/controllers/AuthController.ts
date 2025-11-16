import { Request, Response } from "express";
import AuthService from "../services/AuthServices";

export default class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // POST /login
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { empresa , email, password } = req.body;
       console.log(empresa,email,password) 
      if (!empresa || !email || !password) {
        res.status(400).json({ message: "Email y contraseña son requeridos" });
        return;
      }

      const result = await this.authService.login(empresa,email, password);

      if (!result) {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }

      // Devuelve token y datos básicos
      res.status(200).json({
        message: "Login exitoso",
        token: result.token,
        empresa: result.company,
      });
    } catch (error: any) {
      console.error("Error en AuthController.login:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
