import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

// Conexión a la base de datos
// Las variables de entorno se definen en el archivo .env en la raiz del proyecto
const db = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
})

export default db;