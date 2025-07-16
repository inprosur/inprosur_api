"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommission = exports.getCommissionById = exports.getAllCommissions = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllCommissions = async () => {
    const result = await db_1.default.execute("SELECT * FROM InstructorCommissions");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllCommissions = getAllCommissions;
const getCommissionById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM InstructorCommissions WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getCommissionById = getCommissionById;
const createCommission = async (commission) => {
    const result = await db_1.default.execute(`INSERT INTO InstructorCommissions (
            instructorId, 
            courseId, 
            videoId, 
            documentId, 
            commissionPercentage, 
            commissionAmount, 
            paymentDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
        commission.instructorId,
        commission.courseId || null,
        commission.videoId || null,
        commission.documentId || null,
        commission.commissionPercentage,
        commission.commissionAmount,
        new Date().toISOString() // paymentDate automático
    ]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...commission,
        paymentDate: new Date()
    };
};
exports.createCommission = createCommission;
