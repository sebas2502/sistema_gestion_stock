import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/AuthRoutes";
import { authMiddleware , AuthRequest } from "./middlewares/authMiddleware"; 

dotenv.config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 4000;

app.get("/api/" , (req,res) => {
  res.json({mensaje:"hola"})
})

app.get("/api/protegido", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    mensaje : "Accediendo a ruta protegida",
    usuario : req.user 
  })
});

app.use('/api/auth/' , authRouter);



app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
