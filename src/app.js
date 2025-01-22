import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./utils/swagger-config.js";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

// Cargando los secretos (variables de entorno) desde el archivo .env
dotenv.config();

const app = express();
app.disable("x-powered-by"); // Deshabilitar la cabecera X-Powered-By

// Habilitar CORS
app.use(
  cors({
    origin: "*", // Se permite cualquier origen para facilitar el uso de la api en desarrollo
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Leer cuerpos de solicitudes en formato JSON
app.use(express.json());
// Cargar las cookies en la solicitud
app.use(cookieParser());

// Rutas

// Rutas de prueba
app.get("/", (req, res) => {
  res.json({ message: "API Memento Funcionando" });
});
app.use("/api/users", userRoutes);

// Ruta para la documentacion de la Api con Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
