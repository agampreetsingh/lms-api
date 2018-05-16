"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../db");
exports.students = express_1.Router();
exports.students.get('/', (req, res) => {
    return db_1.Students.findAll({
        attributes: ['id', 'name']
    })
        .then((allStudents) => {
        res.status(200).send(allStudents);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
exports.students.post('/', (request, response) => {
    db_1.Students.create({
        name: request.body.name
    })
        .then((student) => response.status(200).send(student))
        .catch((error) => response.status(400).send(error));
});
exports.students.get('/:id', (req, res) => {
    return db_1.Students.find({
        attributes: ['id', 'name'],
        where: { id: [req.params.id] }
    })
        .then((student) => {
        res.status(200).send(student);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
exports.students.get('/:id/batches', (req, res) => {
    db_1.Students.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((student) => {
        student.getBatches().then((batches) => res.send(batches));
    });
});
