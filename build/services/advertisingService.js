"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdvertising = exports.getAllAdvertisings = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllAdvertisings = async () => {
    const result = await db_1.default.execute("SELECT * FROM Advertisings");
    const rows = Array.isArray(result) ? result[0] : result.rows;
    return rows;
};
exports.getAllAdvertisings = getAllAdvertisings;
const createAdvertising = async (advertising) => {
    const result = await db_1.default.execute("INSERT INTO Advertisings (imgUrl, externalUrl, status, courseId, createdAt) VALUES (?,?,?,?,?)", [
        advertising.imgUrl,
        advertising.externalUrl,
        advertising.status ? 1 : 0,
        advertising.courseId,
        advertising.createdAt.toISOString(),
    ]);
    const id = result.lastInsertRowid;
    const row = {
        ...advertising,
        id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
    };
    return row;
};
exports.createAdvertising = createAdvertising;
