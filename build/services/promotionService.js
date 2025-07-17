"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromotion = exports.getPromotionById = exports.getAllPromotions = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllPromotions = async () => {
    const result = await db_1.default.execute("SELECT * FROM promotions");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllPromotions = getAllPromotions;
const getPromotionById = async (id) => {
    const result = await db_1.default.execute("SELECT * FROM promotions WHERE id = ?", [id]);
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows.length === 1 ? rows[0] : null;
};
exports.getPromotionById = getPromotionById;
const createPromotion = async (promotion) => {
    const result = await db_1.default.execute("INSERT INTO promotions (courseId, startDate, endDate, discountPercentage, status) VALUES (?, ?, ?, ?, ?)", [
        promotion.courseId,
        promotion.startDate.toISOString(),
        promotion.endDate.toISOString(),
        promotion.discountPercentage,
        promotion.status
    ]);
    const id = result.lastInsertRowid;
    return {
        id: id !== undefined ? Number(id) : 0,
        ...promotion
    };
};
exports.createPromotion = createPromotion;
//# sourceMappingURL=promotionService.js.map