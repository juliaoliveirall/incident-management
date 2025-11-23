import express from "express";
import { db } from "./config/db";
import routes from "./routes"; 
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import dotenv from "dotenv";


const app = express();
app.use(express.json());
setupSwagger(app); 
dotenv.config();

// integrar com o frontend
app.use(cors());

app.use("/", routes);

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ message: "conexão bem-sucedida!", rows });
  } catch (error) {
    console.error("erro ao conectar ao banco:", error);
    res.status(500).json({ error: "falha na conexão com o banco de dados" });
  }
});


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Rotas disponíveis em: http://localhost:3000/docs");
});


