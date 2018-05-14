"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../db");
const Subject_1 = require("./Subject");
exports.Teachers = db_1.db.define('teacher', {
    teacherName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Teachers.belongsTo(Subject_1.Subjects, { foreignKey: 'sid' });
