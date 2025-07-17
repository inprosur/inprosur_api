"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsuarioRole = void 0;
const db_1 = __importDefault(require("../config/db"));
// Función para crear una nueva relación entre usuario y role
const createUsuarioRole = async (userRole) => {
    const result = await db_1.default.execute("INSERT INTO UserRoles (userId, roleId) VALUES (?, ?)", [userRole.userId, userRole.roleId]);
    const id = result.lastInsertRowid;
    const row = {
        ...userRole,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createUsuarioRole = createUsuarioRole;
//# sourceMappingURL=userRolesService.js.map