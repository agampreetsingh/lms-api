"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Course_1 = require("../../models/Course");
exports.courses = express_1.Router();
exports.courses.get('/', (req, res) => {
    return Course_1.Courses.findAll({
        attributes: ['id', 'courseName']
    })
        .then((allCourses) => {
        res.status(200).send(allCourses);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retriving Courses ' + err
        });
    });
});
exports.courses.get('/:id', (req, res) => {
    return Course_1.Courses.find({
        attributes: ['id', 'courseName'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retriving Course ' + err
        });
    });
});
