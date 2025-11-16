// src/config/jwtConfig.ts

import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || "super_secreto_para_dev",
  expiresIn: "8h", // duración del token
};
