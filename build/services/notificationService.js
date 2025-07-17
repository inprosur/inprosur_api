"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const db_1 = __importDefault(require("../config/db"));
const createNotification = async (notification) => {
    const result = await db_1.default.execute(`
        INSERT INTO Notifications (destination, studentId, instructorId, status, date)`, [
        notification.destination,
        notification.studentId !== undefined ? notification.studentId : null,
        notification.instructorId !== undefined
            ? notification.instructorId
            : null,
        notification.status !== undefined ? notification.status : null,
        notification.date.toISOString(),
    ]);
    const id = result.lastInsertRowid;
    const row = {
        ...notification,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createNotification = createNotification;
//# sourceMappingURL=notificationService.js.map