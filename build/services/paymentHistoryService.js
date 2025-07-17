"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentHistory = exports.getPaymentHistoryById = exports.getAllPaymentHistories = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllPaymentHistories = async () => {
    const result = await db_1.default.execute("SELECT * FROM PaymentHistory");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllPaymentHistories = getAllPaymentHistories;
const getPaymentHistoryById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM PaymentHistory WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getPaymentHistoryById = getPaymentHistoryById;
const createPaymentHistory = async (payment) => {
    const result = await db_1.default.execute(`INSERT INTO PaymentHistory (
            studentId, 
            courseId, 
            videoId, 
            documentId, 
            amount, 
            paymentDate
        ) VALUES (?, ?, ?, ?, ?, ?)`, [
        payment.studentId,
        payment.courseId || null,
        payment.videoId || null,
        payment.documentId || null,
        payment.amount,
        new Date().toISOString() // paymentDate automático
    ]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...payment,
        paymentDate: new Date()
    };
};
exports.createPaymentHistory = createPaymentHistory;
//# sourceMappingURL=paymentHistoryService.js.map