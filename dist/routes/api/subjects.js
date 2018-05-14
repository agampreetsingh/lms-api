"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subject_1 = require("../../models/Subject");
const Teacher_1 = require("../../models/Teacher");
exports.subjects = express_1.Router();
exports.subjects.get('/', (req, res) => {
    return Subject_1.Subjects.findAll({
        attributes: ['id', 'subjectName']
    })
        .then((allSubjects) => {
        res.status(200).send(allSubjects);
    })
        .catch((err) => {
        res.status(500).send("Subjects not found");
    });
});
exports.subjects.post('/', (request, response) => {
    Subject_1.Subjects.create({
        subjectName: request.body.name,
        cid: request.body.courseId
    })
        .then((subject) => response.status(200).send(subject))
        .catch((error) => response.send(error));
});
exports.subjects.get('/:id', (req, res) => {
    return Subject_1.Subjects.find({
        attributes: ['id', 'subjectName'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        res.status(500).send("Subject not found");
    });
});
exports.subjects.get('/:id/teachers', (req, res) => {
    return Teacher_1.Teachers.findAll({
        attributes: ['id', 'teacherName'],
        where: { sid: [req.params.id] }
    })
        .then((teachers) => {
        res.status(200).send(teachers);
    })
        .catch((err) => {
        res.status(500).send("Teacher not found");
    });
});
