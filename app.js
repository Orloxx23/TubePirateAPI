const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const apiRoutes = require("./routes/api"); // Importar las rutas

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // Analizar el cuerpo de las solicitudes JSON

// Rutas
app.use("/api", apiRoutes); // Usar las rutas desde el archivo api.js

// Manejador de rutas no encontradas
app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

// Manejador de errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
