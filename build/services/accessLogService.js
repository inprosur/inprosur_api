"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessLog = exports.getAccessLogById = exports.getAllAccessLogs = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllAccessLogs = async () => {
    const result = await db_1.default.execute("SELECT * FROM AccessLog");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllAccessLogs = getAllAccessLogs;
const getAccessLogById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM AccessLog WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getAccessLogById = getAccessLogById;
const createAccessLog = async (accessLog) => {
    const result = await db_1.default.execute("INSERT INTO AccessLog (accessType, accessTime, studentId, courseId, videoId, documentId) VALUES (?, ?, ?, ?, ?, ?)", [
        accessLog.accessType,
        accessLog.accessTime.toISOString(),
        accessLog.studentId,
        accessLog.courseId || null,
        accessLog.videoId || null,
        accessLog.documentId || null
    ]);
    const id = result.lastInsertRowid;
    return {
        ...accessLog,
        id: id !== undefined ? Number(id.toString()) : undefined,
    };
};
exports.createAccessLog = createAccessLog;
//# sourceMappingURL=accessLogService.js.map