"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermissionById = exports.getAllPermissions = exports.createPermission = void 0;
const db_1 = __importDefault(require("../config/db"));
// Función para crear un nuevo permiso, se conecta a la base de datos y devuelve el permiso creado
const createPermission = async (permission) => {
    const result = await db_1.default.execute("INSERT INTO Permissions (name, description) VALUES (?, ?)", [permission.name, permission.description]);
    const id = result.lastInsertRowid;
    const row = {
        ...permission,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createPermission = createPermission;
// Función para obtener todos los permisos, se conecta a la base de datos y devuelve un array con todos los permisos
const getAllPermissions = async () => {
    const result = await db_1.default.execute("SELECT * FROM Permissions");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllPermissions = getAllPermissions;
// Función para obtener un permiso por su ID, se conecta a la base de datos y devuelve un permiso o null si el permiso no existe
const getPermissionById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM Permissions WHERE id = ?", [
        id,
    ]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getPermissionById = getPermissionById;
//# sourceMappingURL=permissionService.js.map