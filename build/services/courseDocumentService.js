"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseDocument = exports.getCourseDocumentById = exports.getAllCourseDocuments = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllCourseDocuments = async () => {
    const result = await db_1.default.execute("SELECT * FROM CourseDocuments");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllCourseDocuments = getAllCourseDocuments;
const getCourseDocumentById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM CourseDocuments WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getCourseDocumentById = getCourseDocumentById;
const createCourseDocument = async (doc) => {
    const result = await db_1.default.execute("INSERT INTO CourseDocuments (title, description, fileurl, price, courseid, createdat) VALUES (?, ?, ?, ?, ?, ?)", [doc.title, doc.description, doc.fileUrl, doc.price, doc.courseId, new Date().toISOString()]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...doc,
        createdAt: new Date()
    };
};
exports.createCourseDocument = createCourseDocument;
//# sourceMappingURL=courseDocumentService.js.map