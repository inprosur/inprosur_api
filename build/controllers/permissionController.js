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
exports.getPermissionById = exports.getAllPermissions = exports.createPermission = void 0;
const PermissionService = __importStar(require("../services/permissionService"));
// Función para crear un nuevo permiso, pasamos el permiso al servicio de permisos
const createPermission = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Request body is missing.",
                message: "Request body is missing. Make sure to use express.json() middleware.",
            });
            return;
        }
        const { name, description } = req.body;
        if (!name || !description) {
            res.status(400).json({
                error: "Missing required fields",
                message: "Name, description are required",
            });
            return;
        }
        const newPermission = await PermissionService.createPermission({
            name,
            description,
        });
        res.status(201).json({
            success: true,
            data: newPermission,
            message: "Permission created successfully.",
        });
    }
    catch (error) {
        console.error("Error creating permission:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to create the permission.",
        });
    }
};
exports.createPermission = createPermission;
//Función para obtener todos los permisos, llamando al servicio de permisos
const getAllPermissions = async (_req, res) => {
    try {
        const users = await PermissionService.getAllPermissions();
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching permissions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllPermissions = getAllPermissions;
// Función para obtener un permiso por su ID, llamando al servicio de permisos
const getPermissionById = async (req, res) => {
    const permissionId = parseInt(req.params.id);
    if (isNaN(permissionId)) {
        res.status(400).json({ error: "Invalid permission ID" });
    }
    else {
        try {
            const permission = await PermissionService.getPermissionById(permissionId);
            if (permission) {
                res.status(200).json(permission);
            }
            else {
                res.status(404).json({ error: "Permission not found" });
            }
        }
        catch (error) {
            console.error("Error fetching permission:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.getPermissionById = getPermissionById;
