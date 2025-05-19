"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("@libsql/client/.");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = (0, _1.createClient)({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});
exports.default = db;
