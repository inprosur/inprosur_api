"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleById = exports.getAllRoles = exports.createRole = void 0;
const RoleService = __importStar(require("../services/roleService"));
const RolePermissionService = __importStar(require("../services/rolPermissionService"));
// Función para agregar un nuevo rol usando el servicio de rol. Se espera que el cuerpo de la solicitud contenga las IDs de Rol y Permiso. Se maneja un error 400 en caso de que falten los IDs.
const createRole = async (req, res) => {
    try {
        // Verifica si el cuerpo de la solicitud está vacío y devuelve un error 400 si es así
        if (!req.body) {
            res.status(400).json({
                error: "Request body is missing",
                message: "Body is missing. Make sure to use express.json().",
            });
            return;
        }
        // Verifica si el cuerpo de la solicitud contiene los campos requeridos: name, descirption y permissionId. Si falta alguno de ellos, devuelve un error 400
        const { name, description, permissionId } = req.body;
        if (!name || !description || !permissionId) {
            res.status(400).json({
                error: "Missing required fields.",
                message: "Name, description and permissionId are required.",
            });
            return;
        }
        const newRole = await RoleService.createRole({
            name,
            description,
        });
        const newRolePermission = await RolePermissionService.createRolePermission({
            roleId: newRole.id,
            permissionId,
        });
        // Si todo sale bien, devuelve un mensaje de éxito y el nuevo rol y la relación de rol-permission
        res.status(201).json({
            successs: true,
            data: {
                role: newRole,
                rolePermission: newRolePermission,
            },
            message: "Role and role-permission relationship created succsessfully",
        });
    }
    catch (error) {
        // Maneja cualquier error que ocurra durante el proceso de creación del rol y la relación de rol-permission. Devuelve un error 500 si ocurre un error interno del servidor
        console.error("Error creating role:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to create role and role-permission relationship",
        });
    }
};
exports.createRole = createRole;
// Función para obtener todos los roles usando el servicio del rolService. Se maneja un error 404 si no se encuentran roles en la base de datos.
const getAllRoles = async (_req, res) => {
    try {
        const roles = await RoleService.getAllRoles();
        if (!roles || roles.length === 0) {
            res.status(404).json({
                error: "No roles found",
                message: "No roles found in the database.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: roles,
            message: "Roles retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error retrieving roles:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to retrieve roles.",
        });
    }
};
exports.getAllRoles = getAllRoles;
const getRoleById = async (req, res) => {
    try {
        const roleId = Number(req.params.id);
        if (!Number.isInteger(roleId) || roleId <= 0) {
            res.status(400).json({
                error: "Invalid role ID",
                message: "Role ID must be a positive integer.",
            });
            return;
        }
        const role = await RoleService.getRoleById(roleId);
        if (!role) {
            res.status(404).json({
                error: "Role not found",
                message: `No role found with ID ${roleId}.`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: role,
            message: "Role retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error retrieving role:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to retrieve role.",
        });
    }
};
exports.getRoleById = getRoleById;
//# sourceMappingURL=roleController.js.map