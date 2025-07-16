"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDegrees = exports.getDegreesById = exports.getAllDegrees = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllDegrees = async () => {
    const result = await db_1.default.execute("SELECT * FROM degrees");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllDegrees = getAllDegrees;
const getDegreesById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM degrees WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length
        ? {
            id: rows[0].id,
            name: rows[0].name,
            description: rows[0].description,
        }
        : null;
};
exports.getDegreesById = getDegreesById;
const createDegrees = async (degress) => {
    const result = await db_1.default.execute("INSERT INTO degrees (name, description) VALUES (?, ?)", [degress.name, degress.description]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return {
        id: rows.insertId,
        name: degress.name,
        description: degress.description,
    };
};
exports.createDegrees = createDegrees;
