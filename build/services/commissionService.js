"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommissionById = exports.createCommission = void 0;
const db_1 = __importDefault(require("../config/db"));
const createCommission = async (commission) => {
    const result = await db_1.default.execute("INSERT INTO Commissions (instructorId, percentage) VALUES (?, ?)", [commission.instructorId, commission.percentage]);
    const id = result.lastInsertRowid;
    const row = {
        ...commission,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createCommission = createCommission;
const getCommissionById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM Commissions WHERE id=?", [id]);
    const row = Array.isArray(result) ? result[0] : result.rows;
    if (row.length === 1) {
        return row[0];
    }
    else {
        return null;
    }
};
exports.getCommissionById = getCommissionById;
//# sourceMappingURL=commissionService.js.map