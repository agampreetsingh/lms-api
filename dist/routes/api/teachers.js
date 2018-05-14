"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Batch_1 = require("../../models/Batch");
const Lecture_1 = require("../../models/Lecture");
const Teacher_1 = require("../../models/Teacher");
exports.teachers = express_1.Router();
exports.teachers.get('/', (req, res) => {
    return Teacher_1.Teachers.findAll({
        attributes: ['id', 'teacherName']
    })
        .then((allTeachers) => {
        res.status(200).send(allTeachers);
    })
        .catch((err) => {
        res.status(500).send("Teacher not found");
    });
});
exports.teachers.post('/', (request, response) => {
    Teacher_1.Teachers.create({
        teacherName: request.body.name,
        sid: request.body.subjectId
    })
        .then((teacher) => response.status(200).send(teacher))
        .catch((error) => response.send("Cannot add teacher"));
});
exports.teachers.get('/:id', (req, res) => {
    return Teacher_1.Teachers.find({
        attributes: ['id', 'teacherName'],
        where: { id: [req.params.id] }
    })
        .then((teacher) => {
        res.status(200).send(teacher);
    })
        .catch((err) => {
        res.status(500).send("Cannot get teacher");
    });
});
exports.teachers.get('/:id/batches', (req, res) => {
    return Lecture_1.Lectures.findAll({
        attributes: ['bid'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName']
            }],
        where: { tid: [req.params.id] },
        group: ['bid']
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send("No batch found");
    });
});
