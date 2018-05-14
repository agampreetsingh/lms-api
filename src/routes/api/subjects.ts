import express, { Router, Request } from 'express'
import { Subjects } from '../../models/Subject'
import { Teachers } from '../../models/Teacher'

export const subjects: Router = Router();

subjects.get('/', (req, res) => {
    return Subjects.findAll({
        attributes: ['id', 'subjectName']
    })
        .then((allSubjects) => {
            res.status(200).send(allSubjects);
        })
        .catch((err) => {
            res.status(500).send("Subjects not found")
        })
});

subjects.post('/', (request, response) => {
    Subjects.create({
        subjectName: request.body.name,
        cid: request.body.courseId
    })
    .then((subject) => response.status(200).send(subject))
    .catch((error) => response.send(error))
});

subjects.get('/:id', (req, res) => {
    return Subjects.find({
        attributes: ['id', 'subjectName'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
            res.status(200).send(subject);
        })
        .catch((err) => {
            res.status(500).send("Subject not found")
        })
});

subjects.get('/:id/teachers', (req, res) => {
    return Teachers.findAll({
        attributes: ['id', 'teacherName'],
        where: { sid: [req.params.id] }
    })
        .then((teachers) => {
            res.status(200).send(teachers);
        })
        .catch((err) => {
            res.status(500).send("Teacher not found")
        })
});
