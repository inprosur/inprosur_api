"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleByName = exports.getRoleById = exports.getAllRoles = exports.createRole = void 0;
const db_1 = __importDefault(require("../config/db"));
// Función para crear un nuevo rol, se conecta a la base de datos y devuelve el rol creado
const createRole = async (role) => {
    const result = await db_1.default.execute("INSERT INTO Roles (name, description) VALUES (?, ?)", [role.name, role.description]);
    const id = result.lastInsertRowid;
    const row = {
        ...role,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createRole = createRole;
// Función para obtener todos los roles, se conecta a la base de datos y devuelve un array con todos los roles.
const getAllRoles = async () => {
    const result = await db_1.default.execute("SELECT * FROM Roles");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllRoles = getAllRoles;
// Función para obtener un rol por su ID, se conecta a la base de datos y devuelve un rol o null si no existe.
const getRoleById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM Roles WHERE id=?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getRoleById = getRoleById;
// Función para obtener un rol por su nombre, se conecta a la base de datos y devuelve un rol o null si no existe.
const getRoleByName = async (name) => {
    const result = await db_1.default.execute("SELECT * FROM Roles WHERE name=?", [name]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getRoleByName = getRoleByName;
