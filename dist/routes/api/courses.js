"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Course_1 = require("../../models/Course");
const Batch_1 = require("../../models/Batch");
const Lecture_1 = require("../../models/Lecture");
const Teacher_1 = require("../../models/Teacher");
const Student_1 = require("../../models/Student");
exports.courses = express_1.Router();
exports.courses.get('/', (req, res) => {
    return Course_1.Courses.findAll({
        attributes: ['id', 'courseName']
    })
        .then((allCourses) => {
        res.status(200).send(allCourses);
    })
        .catch((err) => {
        res.status(500).send("Courses not found");
    });
});
exports.courses.post('/', (request, response) => {
    if (!request.body.name)
        return response.status(400).send("Invalid Request");
    Course_1.Courses.create({
        courseName: request.body.name
    })
        .then((course) => {
        response.status(200).send(course);
    });
});
exports.courses.get('/:id', (req, res) => {
    return Course_1.Courses.find({
        attributes: ['id', 'courseName'],
        where: { id: [req.params.id] }
    })
        .then((course) => {
        res.status(200).send(course);
    })
        .catch((err) => {
        res.status(500).send({
            err
        });
    });
});
exports.courses.get('/:id/batches', (req, res) => {
    return Batch_1.Batches.findAll({
        attributes: ['id', 'batchName'],
        include: [{
                model: Course_1.Courses,
                attributes: ['courseName'],
                required: true
            }],
        where: { cid: [req.params.id] }
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send("Course not found");
    });
});
exports.courses.post('/:id/batches', (request, response) => {
    if (isNaN(parseInt(request.params.id)))
        return response.status(400).send("Invalid course ID");
    Batch_1.Batches.create({
        batchName: request.body.name,
        cid: request.params.id
    })
        .then((batch) => response.status(200).send(batch));
});
exports.courses.get('/:id/batches/:bid', (req, res) => {
    return Batch_1.Batches.find({
        attributes: ['id', 'batchName'],
        include: [{
                model: Course_1.Courses,
                attributes: ['courseName'],
                required: true
            }],
        where: {
            cid: [req.params.id],
            id: [req.params.bid]
        }
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send("Batches not found");
    });
});
exports.courses.get('/:id/batches/:bid/lectures', (req, res) => {
    Lecture_1.Lectures.findAll({
        where: {
            bid: req.params.bid
        }
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(500).send("Lectures not found");
    });
});
exports.courses.post('/:couseId/batches/:batchId/lectures', (request, response) => {
    Lecture_1.Lectures.create({
        bid: request.params.batchId,
        tid: request.body.teacherId
    })
        .then((lecture) => response.status(200).send(lecture))
        .catch((error) => response.status(400).send("Lecture not found"));
});
exports.courses.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    return Lecture_1.Lectures.findOne({
        attributes: ['id'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName'],
                include: [{
                        model: Course_1.Courses,
                        attributes: ['courseName'],
                        required: true
                    }],
                where: {
                    cid: [req.params.id],
                    id: [req.params.bid]
                }
            }],
        where: {
            id: [req.params.lid]
        }
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(500).send("Lectures not found");
    });
});
exports.courses.get('/:id/batches/:bid/teachers', (req, res) => {
    return Lecture_1.Lectures.findAll({
        attributes: ['id'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName'],
                include: [{
                        model: Course_1.Courses,
                        attributes: ['courseName'],
                        required: true
                    }],
                where: {
                    cid: [req.params.id],
                    id: [req.params.bid]
                }
            },
            {
                model: Teacher_1.Teachers,
                attributes: ['teacherName']
            }],
        group: ['tid']
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(500).send("Teachers not found");
    });
});
exports.courses.get('/:id/batches/:bid/students', (req, res) => {
    return Batch_1.Batches.findAll({
        attributes: ['batchName'],
        include: [{
                model: Course_1.Courses,
                attributes: ['courseName'],
            },
            {
                model: Student_1.Students,
                attributes: ['studentName']
            }],
        where: {
            cid: [req.params.id],
            id: [req.params.bid]
        }
    })
        .then((students) => {
        res.status(200).send(students);
    })
        .catch((err) => {
        res.status(500).send("Teachers not found");
    });
});
exports.courses.post('/', (req, res) => {
    return Course_1.Courses.create({
        courseName: req.body.courseName,
    })
        .then((course) => {
        res.status(200).send(course);
    });
});
exports.courses.delete('/:id', (req, res) => {
    return Course_1.Courses.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
        res.status(500).send("Cannot delete");
    });
});
