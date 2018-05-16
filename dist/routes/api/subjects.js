"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../db");
exports.subjects = express_1.Router();
exports.subjects.get('/', (req, res) => {
    return db_1.Subjects.findAll({
        attributes: ['id', 'name']
    })
        .then((allSubjects) => {
        res.status(200).send(allSubjects);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
exports.subjects.post('/', (request, response) => {
    db_1.Subjects.create({
        name: request.body.name
    })
        .then((subject) => response.status(200).send(subject))
        .catch((error) => response.send(error));
});
exports.subjects.get('/:id', (req, res) => {
    return db_1.Subjects.find({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
exports.subjects.get('/:id/teachers', (req, res) => {
    db_1.Subjects.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((subject) => {
        subject.getTeachers().then((teachers) => res.send(teachers));
    });
});
