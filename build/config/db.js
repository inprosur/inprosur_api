"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@libsql/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Conexión a la base de datos
// Las variables de entorno se definen en el archivo .env en la raiz del proyecto
const db = (0, client_1.createClient)({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});
exports.default = db;
//# sourceMappingURL=db.js.map