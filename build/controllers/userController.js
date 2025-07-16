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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.getUserByEmail = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const UserService = __importStar(require("../services/userService"));
const hashPassword_1 = require("../utils/hashPassword");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Función para obtener todos los usuarios usando el servicio de usuario
const getAllUsers = async (_req, res) => {
    try {
        const users = await UserService.getAllUsers();
        if (!users || users.length === 0) {
            res.status(404).json({
                error: "No users found",
                message: "No users found in database.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: users,
            message: "Users retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to fetch users",
        });
    }
};
exports.getAllUsers = getAllUsers;
// Función para obtener un usuario por su ID usando el servicio de usuario. Se espera que el ID sea un número entero y se maneja un error 400 si no lo es.
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res
            .status(400)
            .json({ error: "Invalid user Id", message: "User ID must be a number" });
    }
    else {
        try {
            const user = await UserService.getUserById(userId);
            if (user) {
                res.status(200).json({
                    success: true,
                    data: user,
                    message: "User retrieved successfully.",
                });
            }
            else {
                res
                    .status(404)
                    .json({ error: "User not found", message: "User not found." });
            }
        }
        catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Failed to fetch user",
            });
        }
    }
};
exports.getUserById = getUserById;
// Función para crear un nuevo usuario usando el servicio de usuario. Se espera que el cuerpo de las solicitud contenga los campos username, email y password. Se maneja un error 400 si faltan campos requeridos.
const createUser = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: "Body is missing",
                message: "Request body is missing. Make sure to use express.json() middleware.",
            });
            return;
        }
        const { username, email, password, uId } = req.body;
        if (!username || !email || !password) {
            res.status(400).json({
                error: "Missing required fields",
                mesage: "All the fileds are required",
            });
            return;
        }
        const newUser = await UserService.createUser({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: await (0, hashPassword_1.hashedPassword)(password),
            uId,
            createdAt: new Date(),
        });
        res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully.",
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createUser = createUser;
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({
                error: "Missin email parameter",
                message: "Email parameter is required",
            });
            return;
        }
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            res.status(404).json({
                error: "User not found",
                message: "No user found with email: ${email}",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user,
            message: "User retrieved successfully.",
        });
    }
    catch (error) {
        console.error("Error fetching user by email: ", error);
        res.status(500).json({
            error: "Internal server Error",
            message: "Failed to fetch user by email.",
        });
    }
};
exports.getUserByEmail = getUserByEmail;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                error: "Missing required fields",
                message: "Email and password are required.",
            });
            return;
        }
        const user = await UserService.getUserByEmail(email.toLowerCase());
        if (!user) {
            res.status(404).json({
                error: "User not found",
                message: `No user found with email: ${email}`,
            });
            return;
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            res.status(401).json({
                error: "Invalid credentials",
                message: "Incorrect password.",
            });
            return;
        }
        // ✅ Éxito
        res.status(200).json({
            success: true,
            data: user,
            message: "Login successful.",
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to log in.",
        });
    }
};
exports.loginUser = loginUser;
//actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                error: "Ivalid or missing user ID",
                message: "A valid user ID is required.",
            });
            return;
        }
        if (!updates || Object.keys(updates).length === 0) {
            res.status(400).json({
                error: "No updates provided",
                message: "At least one field is required to update.",
            });
            return;
        }
        const updatedUser = await UserService.updateUser(Number(id), updates);
        if (!exports.updateUser) {
            res.status(404).json({
                error: "User not found",
                message: `No user found with ID: ${id}`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully.",
        });
    }
    catch (error) {
        console.error("Error updating user: ", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to update user",
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({
                error: "Invalid user ID",
                message: "User ID must be a number",
            });
            return;
        }
        const deletedUser = await UserService.deleteUser(id);
        if (!deletedUser) {
            res.status(404).json({
                error: "User not found",
                message: `No user found with ID: ${id}`,
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: deletedUser,
            message: "User deleted successfully.",
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "Failed to delete user",
        });
    }
};
exports.deleteUser = deleteUser;
