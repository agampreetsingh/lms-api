"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = require("../db");
const Course_1 = require("./Course");
exports.Subjects = db_1.db.define('subject', {
    subjectName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Subjects.belongsTo(Course_1.Courses, { foreignKey: 'cid' });
