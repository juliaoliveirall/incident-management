import express from "express";
import { db } from "./config/db";

const app = express();
app.use(express.json());

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
  console.log("servidor rodando na porta 3000");
});
