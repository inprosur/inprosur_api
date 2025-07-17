"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStundentCourses = exports.createEnrollment = exports.getEnrollmentById = exports.getAllEnrollments = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllEnrollments = async () => {
    const result = await db_1.default.execute("SELECT * FROM enrollments");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllEnrollments = getAllEnrollments;
const getEnrollmentById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM enrollments WHERE id = ?", [
        id,
    ]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getEnrollmentById = getEnrollmentById;
const createEnrollment = async (enrollment) => {
    const result = await db_1.default.execute(`INSERT INTO enrollments (
            studentId, 
            courseId, 
            enrollmentDate,
            amount, 
            paymentDate,
            status
        ) VALUES (?, ?, ?, ?, ?, ?)`, [
        enrollment.studentId,
        enrollment.courseId,
        new Date().toISOString(), // enrollmentDate automático
        enrollment.amount,
        new Date().toISOString(), // paymentDate automático
        enrollment.status || false, // Default: false
    ]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...enrollment,
        enrollmentDate: new Date(),
        paymentDate: new Date(),
    };
};
exports.createEnrollment = createEnrollment;
const getStundentCourses = async (studentId) => {
    const result = await db_1.default.execute("SELECT c.* FROM Courses c INNER JOIN enrollments e ON c.id = e.courseId WHERE e.studentId = ?", [studentId]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getStundentCourses = getStundentCourses;
//# sourceMappingURL=enrollmentService.js.map