"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRollPermissionByIds = exports.createRolePermission = void 0;
const db_1 = __importDefault(require("../config/db"));
// Función para crear una nueva relación entre rol y permiso
const createRolePermission = async (rolePermission) => {
    const result = await db_1.default.execute("INSERT INTO RolePermissions (roleId, permissionId) VALUES (?, ?)", [rolePermission.roleId, rolePermission.permissionId]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    const newRolePermission = rows[0];
    return newRolePermission;
};
exports.createRolePermission = createRolePermission;
const getRollPermissionByIds = async (rolePermission) => {
    const result = await db_1.default.execute("SELECT * FROM RolePermissions WHERE roleId=? AND permissionId=?", [rolePermission.roleId, rolePermission.permissionId]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getRollPermissionByIds = getRollPermissionByIds;
