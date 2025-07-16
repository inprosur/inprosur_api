"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentByUserId = exports.getStudentById = exports.getAllStudents = exports.createStudent = void 0;
const db_1 = __importDefault(require("../config/db"));
const createStudent = async (student) => {
    const result = await db_1.default.execute("INSERT INTO Students (name, phone, address, fingerprint, userId, createdAt) VALUES(?, ?, ?, ?, ?, ?)", [
        student.name,
        student.phone,
        student.address,
        student.fingerprint || null,
        student.userId,
        student.createdAt.toISOString(),
    ]);
    const id = result.lastInsertRowid;
    const row = {
        ...student,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createStudent = createStudent;
const getAllStudents = async () => {
    const result = await db_1.default.execute("SELECT * FROM Students");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM Students WHERE id=?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getStudentById = getStudentById;
const getStudentByUserId = async (userId) => {
    const result = await db_1.default.execute("SELECT * FROM Students WHERE userId = ?", [
        userId,
    ]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getStudentByUserId = getStudentByUserId;
