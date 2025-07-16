"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserByEmail = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const hashPassword_1 = require("../utils/hashPassword");
// Función para obtener todos los usuarios, se conecta a la base de datos y devuelve un array con todos los usuarios
const getAllUsers = async () => {
    const result = await db_1.default.execute("SELECT * FROM users");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllUsers = getAllUsers;
// Función para obtener un usuario por su ID, se conecta a la base de datos y devuelve un usuario o null si no existe
const getUserById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM users WHERE id =?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length == 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getUserById = getUserById;
// Función para crear un nuevo usuario, se conecta a la base de datos y devuelve el usuario creado
const createUser = async (user) => {
    const result = await db_1.default.execute("INSERT INTO Users (username, email, password, uId, createdAt) VALUES (?,?,?,?,?)", [
        user.username,
        user.email,
        user.password,
        user.uId,
        user.createdAt.toISOString(),
    ]);
    const id = result.lastInsertRowid;
    const row = {
        ...user,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createUser = createUser;
//funsion para obtener usuariospor email
const getUserByEmail = async (email) => {
    const result = await db_1.default.execute("SELECT * FROM users WHERE email = ?", [
        email,
    ]);
    const row = Array.isArray(result) ? result[0] : result.rows;
    if (row.length == 1) {
        return row[0];
    }
    else {
        return null;
    }
};
exports.getUserByEmail = getUserByEmail;
const updateUser = async (id, updates) => {
    if (updates.password) {
        updates.password = await (0, hashPassword_1.hashedPassword)(updates.password);
    }
    const fields = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
    const values = Object.values(updates);
    if (fields.length === 0) {
        throw new Error("No fields provides to update");
    }
    const result = await db_1.default.execute(`UPDATE users SET ${fields} WHERE id = ?`, [
        ...values,
        id,
    ]);
    if (result.rowsAffected === 0) {
        return null;
    }
    return (0, exports.getUserById)(id);
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    // Verificar si el usuario existe
    const user = await (0, exports.getUserById)(id);
    if (!user)
        return null;
    // Ejecutar la eliminación
    await db_1.default.execute("DELETE FROM users WHERE id = ?", [id]);
    return user; // Retornar el usuario eliminado
};
exports.deleteUser = deleteUser;
