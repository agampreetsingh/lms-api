"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../db");
const db_2 = require("../../db");
const db_3 = require("../../db");
exports.teachers = express_1.Router();
exports.teachers.get('/', (req, res) => {
    return db_3.Teachers.findAll({
        attributes: ['id', 'name']
    })
        .then((allTeachers) => {
        res.status(200).send(allTeachers);
    })
        .catch((err) => {
        res.status(500).send("No Teachers Found");
    });
});
exports.teachers.post('/', (request, response) => {
    db_3.Teachers.create({
        name: request.body.name,
        subjectId: request.body.subjectId
    })
        .then((teacher) => response.status(200).send(teacher))
        .catch((error) => response.send(error));
});
exports.teachers.get('/:id', (req, res) => {
    return db_3.Teachers.find({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((teacher) => {
        res.status(200).send(teacher);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
exports.teachers.get('/:id/batches', (req, res) => {
    return db_2.Lectures.findAll({
        attributes: ['bid'],
        include: [{
                model: db_1.Batches,
                attributes: ['batchName']
            }],
        where: { tid: [req.params.id] },
        group: ['bid']
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
