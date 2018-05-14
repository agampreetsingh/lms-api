"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../db");
exports.Students = db_1.db.define('student', {
    studentRoll: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    studentName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
