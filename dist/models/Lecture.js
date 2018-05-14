"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const Batch_1 = require("./Batch");
const Teacher_1 = require("./Teacher");
exports.Lectures = db_1.db.define('lecture', {});
exports.Lectures.belongsTo(Batch_1.Batches, { foreignKey: 'bid' });
exports.Lectures.belongsTo(Teacher_1.Teachers, { foreignKey: 'tid' });
