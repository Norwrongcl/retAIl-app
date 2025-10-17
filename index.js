import express from "express";
import pg from "pg";
const { Pool } = pg;

const app = express();
app.use(express.json());

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/api/planificacion/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  const result = await db.query("SELECT * FROM vista_turnos_diarios WHERE usuario_id = $1", [usuarioId]);
  res.json(result.rows);
});

app.listen(3000, () => console.log("✅ Backend corriendo en puerto 3000"));
