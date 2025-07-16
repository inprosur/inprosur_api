"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesByDegreeId = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllCategories = async () => {
    const result = await db_1.default.execute("SELECT * FROM categories");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM categories WHERE id = ?", [
        id,
    ]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length == 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (category) => {
    const result = await db_1.default.execute("INSERT INTO categories (name, degreeId) VALUES (?, ?)", [category.name, category.degreeId]);
    const id = result.lastInsertRowid;
    const row = {
        ...category,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createCategory = createCategory;
const getCategoriesByDegreeId = async (degreeId) => {
    const result = await db_1.default.execute("SELECT * FROM categories WHERE degreeId = ?", [degreeId]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getCategoriesByDegreeId = getCategoriesByDegreeId;
