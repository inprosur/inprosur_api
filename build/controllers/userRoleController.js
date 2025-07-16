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
exports.createUserRole = void 0;
const UserRolService = __importStar(require("../services/userRolesService"));
const createUserRole = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Bad Request",
                message: "Request body is required.",
            });
            return;
        }
        const { userId, roleId } = req.body;
        if (!userId || !roleId) {
            res.status(400).json({
                error: "Fields Missing",
                message: "userId and roleId are required.",
            });
            return;
        }
        const newUserRol = await UserRolService.createUsuarioRole({
            userId,
            roleId,
        });
        res.status(201).json({
            success: true,
            data: newUserRol,
            message: "User role relationship created successfullly.",
        });
    }
    catch (error) {
        console.error("Error creating user role:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Failed to create user role relationship.",
        });
    }
};
exports.createUserRole = createUserRole;
