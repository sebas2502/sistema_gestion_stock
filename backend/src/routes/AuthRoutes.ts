import { Router } from "express";
import AuthController from "../controllers/AuthController";
import AuthService from "../services/AuthServices";

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// POST /login
router.post("/login", (req, res) => authController.login(req, res));

export default router;
