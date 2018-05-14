"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subject_1 = require("../../models/Subject");
exports.subjects = express_1.Router();
exports.subjects.get('/', (req, res) => {
    return Subject_1.Subjects.findAll({
        attributes: ['id', 'subjectName']
    })
        .then((allSubjects) => {
        res.status(200).send(allSubjects);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retriving subjects ' + err
        });
    });
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
        res.status(500).send({
            error: 'Error retriving subject ' + err
        });
    });
});
