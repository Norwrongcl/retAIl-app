import express from "express";
import pg from "pg";
const { Pool } = pg;

const app = express();
app.use(express.json());

// Conexión a la base de datos
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 🟢 Ruta principal (para probar si el backend responde)
app.get("/", (req, res) => {
  res.send("🚀 Backend RetAI App funcionando correctamente");
});

// 🧩 Ruta para obtener planificación de usuario
app.get("/api/planificacion/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const result = await db.query(
      "SELECT * FROM vista_turnos_diarios WHERE usuario_id = $1",
      [usuarioId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al consultar planificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 🔥 Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend corriendo en puerto ${PORT}`));
