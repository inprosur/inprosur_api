"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructorById = exports.getAllInstructors = exports.createInstructor = void 0;
const db_1 = __importDefault(require("../config/db"));
const createInstructor = async (instructor) => {
    const result = await db_1.default.execute("INSERT INTO Instructors (name, biography, phone, createdAt, userId) VALUES(?, ?, ?, ?, ?)", [
        instructor.name,
        instructor.biography,
        instructor.phone,
        instructor.createdAt.toISOString(),
        instructor.userId,
    ]);
    const id = result.lastInsertRowid;
    const row = {
        ...instructor,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createInstructor = createInstructor;
const getAllInstructors = async () => {
    const result = await db_1.default.execute("SELECT * FROM Instructors");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllInstructors = getAllInstructors;
const getInstructorById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM Instructors WHERE id=?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return null;
    }
};
exports.getInstructorById = getInstructorById;
//# sourceMappingURL=instructorService.js.map